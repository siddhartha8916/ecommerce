class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };

    // Removing Field for category
    const removedFields = ["keyword", "page", "limit"];
    removedFields.forEach((key) => {
      delete queryCopy[key];
    });

    //Filter for Price and Rating

    let queryStr = JSON.stringify(queryCopy);

    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g,key =>`$${key}`);

    queryStr = JSON.parse(queryStr)

    this.query = this.query.find(queryStr);

    return this;
  }

  pagination(resultsPerPage){

    const currentPage = Number(this.queryStr.page) || 1;

    const skip = resultsPerPage * (currentPage - 1);
    
    this.query = this.query.limit(resultsPerPage).skip(skip);
    return this;
  }
}

module.exports = ApiFeatures;
