const Alert = ({ alert, onClose }) => {
  if (!alert) return null;

  return (
    <div
      className={`alert alert-${alert.type} alert-dismissible fade show text-center`}
      role="alert"
    >
      {alert.msg}
      <button
        type="button"
        className="btn-close"
        onClick={onClose}
        aria-label="Close"
      ></button>
    </div>
  );
};

export default Alert;
