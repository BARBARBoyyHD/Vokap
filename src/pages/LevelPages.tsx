import Layout from "../components/ui/Layout";
import LevelList from "../components/level/LevelList";
export default function LevelPages() {
  return (
    <Layout>
      <h1 className="text-xl font-bold">LevelPages</h1>
      <p>Welcome to the protected dashboard.</p>
      <LevelList />
    </Layout>
  );
}
