const { Parser } = require('json2csv');

const generateCSV = async (startDate, endDate) => {
  const payments = await fetchPayments(startDate, endDate); // Assume this function fetches the relevant data
  const fields = ['medicineName', 'sellerEmail', 'buyerEmail', 'totalamount', 'date'];
  const opts = { fields };
  const parser = new Parser(opts);
  return parser.parse(payments);
};

module.exports = { generateCSV, /* other generators */ };
