class ApiResponse {
  constructor(statusCode, success, message, data = null, meta = null) {
    this.statusCode = statusCode;
    this.message = message;
    this.success = success;
    this.data = data;
    this.meta = meta;
  }
  send(res) {
    const response = {};
    response.message = this.message;
    response.success = this.success;
    if (this.data) {
      response.data = this.data;
    }
    if (this.meta) {
      response.meta = this.meta;
    }
    return res.status(this.statusCode).json(response);
  }
}
module.exports = ApiResponse;
