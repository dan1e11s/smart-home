import style from './index.module.css';

const Container = ({ children }) => {
  return <div className={style.container}>{children}</div>;
};

export default Container;
