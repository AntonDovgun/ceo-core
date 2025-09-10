import { Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";

import { UploadFiles } from "./components/UploadFiles/UploadFiles";
import { QueryGroups } from "./components/QueryGroups/QueryGroups";
import { HeaderActions } from "./components/HeaderActions/HeaderActions";

import styles from "./App.module.css";

function App() {
  return (
    <Layout>
      <Header className={styles.header}>
        <UploadFiles />
        <HeaderActions />
      </Header>
      <Content className={styles.content}>
        <QueryGroups />
      </Content>
    </Layout>
  );
}

export default App;
