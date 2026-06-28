import css from "./Notification.module.css";
type Props = {};

const Notification = (props: Props) => {
  const {} = props;

  return <p className={css.message}>No feedback yet</p>;
};

export default Notification;
