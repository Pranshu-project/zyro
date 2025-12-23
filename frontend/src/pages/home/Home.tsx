import HomeHeader from "./HomeHeader";
import HomeStats from "./HomeStats";
import RecentProjects from "./RecentProjects";
import RecentIssues from "./RecentIssues";

const Home = () => {
  return (
    <section className="space-y-6 p-2">
      {/* Header */}
      <HomeHeader />

      {/* Stats */}
      <HomeStats />

      {/* Projects + Issues */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div>
          <RecentProjects />
        </div>

        <div>
          <RecentIssues />
        </div>
      </div>
    </section>
  );
};

export default Home;
