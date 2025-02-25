import { Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";

import { UploadFiles } from "./components/UploadFiles/UploadFiles";

import styles from "./App.module.css";

function App() {
  return (
    <Layout>
      <Header className={styles.header}>
        <UploadFiles />
      </Header>
      <Content className={styles.content}>
        <div>This is content</div>
      </Content>
    </Layout>
  );
}

export default App;
