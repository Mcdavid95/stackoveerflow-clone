const DbServices = {
  /**
   * Database create service funcion
   * @param {Object} model - Defined model
   * @param {Object} data - Data to be created
   * @returns {Promise} - Promise response
   */
  create(model, data) {
    return new model(data);
  },

  /**
   * @param {object} model model /table
   * @param {string} id id of row to get
   * @param {object} options query options
   * @returns {Promise} Promise resolved or rejected
   * @description get one row by the id been passed to it
   */
  getById(model, id) {
    return model.findById(id);
  },

  /**
   * @param {object} model model /table
   * @param {object} options query options
   * @returns {Promise} Promise resolved or rejected
   * @description get one row by the options been passed to it
   */
  getByOptions(model, options) {
    return model.findOne(options);
  },

  /**
   * @param {object} model model /table
   * @param {object} query conditions to query
   * @param {object} updates conditions to query
   * @param {object} options columns with values to update
   * @returns {Promise} Promise resolved or rejected
   * @description updates one row whose details is passed to as argument in options with the
   * values in query
   */
  update(model, query, updates, options) {
    return model.findOneAndUpdate(
      query,
      updates,
      options
    );
  },

  /**
   * @param {object} model model /table
   * @param {object} options query options
   * @returns {Promise} Promise resolved or rejected
   * @description gets all items that fit the criteria and returns rows and count
   */
  getAll(model, options) {
    return model.find(options);
  },

  /**
   * @param {object} model model /table
   * @param {object} options query options
   * @returns {Promise} Promise resolved or rejected
   * @description gets count of all items
   */
  countAllRecord(model) {
    return model.estimatedDocumentCount();
  },

  /**
   * @param {object} model model /table
   * @param {object} options query options
   * @returns {Promise} Promise resolved or rejected
   * @description gets count of all items
   */
  countAllRecordWithOptions(model, options) {
    return model.countDocuments(options);
  },

  /**
   * @param {object} model model /table
   * @param {object} options query options
   * @returns {Promise} Promise resolved or rejected
   * @description gets all items that fit the criteria and returns rows and count
   */
  getOrCreate(model, options) {
    return model.findOrCreate(options);
  }
};

export default DbServices;
