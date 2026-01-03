import uuid
import asyncio
from typing import Coroutine
from contextvars import ContextVar, Token

BackgroundTasks = set()

RequestId: ContextVar[str] = ContextVar('request_id', default = None) # type: ignore

DBConnectionType: ContextVar[str] = ContextVar('db_connection_type', default='write')

def create_db_connection_type(connection_type: str) -> Token:
    return DBConnectionType.set(connection_type)

def get_current_db_connection_type() -> str:
    return DBConnectionType.get()

def remove_db_connection_type_from_pool(token: Token) -> None:
    DBConnectionType.reset(token)


def create_request_id() -> Token:
    """
    Attaches a uuid against current coroutine stack.
    """
    return RequestId.set(str(uuid.uuid4()))

def get_current_request_id() -> str:
    """
    Gets the uuid attached against current coroutine stack.
    """
    return RequestId.get()

def remove_request_id_from_pool(token: Token) -> None:
    """
    Removes the uuid attached against current coroutine stack.
    """
    RequestId.reset(token)


def create_background_task(task: Coroutine) -> None:
    """
    Creates a background task which runs in same event loop.
    Might change this in future to different event loop.
    """
    curr_task = asyncio.create_task(task)
    BackgroundTasks.add(curr_task)
    curr_task.add_done_callback(BackgroundTasks.discard)