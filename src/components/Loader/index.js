const Loader = (props) => {
return (props.loading? <div className="disable"><div className="loader"></div>{props.children}</div>: props.children);
};

export default Loader;