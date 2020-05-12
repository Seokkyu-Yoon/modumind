const uuid = {
  get() {
    return (
      new Date().getTime().toString(16)
      + Math.random().toString(16).substr(2)
    ).substr(2, 16);
  },
};

export default uuid;
