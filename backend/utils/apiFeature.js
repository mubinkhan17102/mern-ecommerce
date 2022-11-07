class ApiFeatures{
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }

    search(){
        const keyword = this.queryString.keyword ? 
        {
            name: {
                $regex: this.queryString.keyword,
                $options: 'i'
            }
        }:
        {

        }

        this.query = this.query.find({...keyword})
        return this;
    }

    filter(){
        const queryCopy = {...this.queryString}

        //Removing some field
        const remodedField = ['keyword', 'page', 'limit'];

        remodedField.forEach(key=> delete queryCopy[key])

        //Filter for price and rating
        let querStr = JSON.stringify(queryCopy);
        querStr = querStr.replace(/\b(gt|gte|lt|lte)\b/g, key=>`$${key}`)
        this.query = this.query.find(JSON.parse(querStr));

        return this;
    }

    paginate(resultPerPage){
        const currentPage = Number(this.queryString.page) || 1;
        const skip = resultPerPage * (currentPage - 1);
        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;
    }
}

module.exports = ApiFeatures;