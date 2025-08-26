import { Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";

import { UploadFiles } from "./components/UploadFiles/UploadFiles";

import styles from "./App.module.css";
import { SearchQueries } from "./components/SearchQueries/SearchQuery";

function App() {
  return (
    <Layout>
      <Header className={styles.header}>
        <UploadFiles />
      </Header>
      <Content className={styles.content}>
        <SearchQueries />
      </Content>
    </Layout>
  );
}

export default App;
