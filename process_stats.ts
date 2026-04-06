import * as XLSX from 'xlsx';
import * as fs from 'fs';

const filePath = 'review_20260406_153425.xlsx';
const fileBuffer = fs.readFileSync(filePath);
const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet);

const reviews = jsonData.map(row => {
  let tag = "기타";
  let defaultImage = "/sunmain.png";
  if (row["상품명"].includes("선세럼")) {
    tag = "선세럼";
    defaultImage = "/sunmain.png";
  } else if (row["상품명"].includes("EGF재생크림")) {
    tag = "EGF 재생크림";
    defaultImage = "/cream_main.png";
  } else if (row["상품명"].includes("EGF에센스")) {
    tag = "EGF 세럼";
    defaultImage = "/serum_main.png";
  }

  return {
    author: `${row["등록자"]} — ${row["리뷰구분"]}`,
    tag: tag,
    text: row["리뷰상세내용"].replace(/\n/g, " "),
    image: row["포토/영상"] || defaultImage,
    rating: row["구매자평점"]
  };
});

const totalReviews = reviews.length;
const avgRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1);
const repurchaseCount = jsonData.filter(row => 
  row["리뷰구분"] === "한달사용" || 
  row["리뷰상세내용"].includes("재구매") || 
  (row["관련리뷰상세내용"] && row["관련리뷰상세내용"].includes("재구매"))
).length;
const repurchaseRate = Math.round((repurchaseCount / totalReviews) * 100);

console.log("--- REVIEWS_DATA ---");
console.log(JSON.stringify(reviews.map(({rating, ...rest}) => rest), null, 2));
console.log("--- STATS ---");
console.log({ totalReviews, avgRating, repurchaseRate });
