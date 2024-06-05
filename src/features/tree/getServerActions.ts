const getServerActions = (endpoint: string, version: number = 1) => {
   return Object.freeze({
      SET_COLLAPSED: `/api/${endpoint}/collapsed`,
      UPDATE:        `/api/${endpoint}/update`,
      UPDATE_MANY:   `/api/${endpoint}/updateMany`,
      CREATE:        `/api/${endpoint}/create`,
      DELETE:        `/api/${endpoint}/delete`,
      UP:            `/api/${endpoint}/up`,
      DOWN:          `/api/${endpoint}/down`,
      RIGHT:         `/api/${endpoint}/right`,
      LEFT:          `/api/${endpoint}/left`,
      FETCH:         `/api/${endpoint}`
   });
};

export default getServerActions;
