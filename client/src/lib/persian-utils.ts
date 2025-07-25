// Persian number conversion
export function toPersianNumber(num: number | string): string {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return num.toString().replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
}

// Format price in Persian
export function formatPrice(price: number): string {
  const billions = Math.floor(price / 1000000000);
  const millions = Math.floor((price % 1000000000) / 1000000);
  
  let result = '';
  if (billions > 0) {
    result += `${toPersianNumber(billions)} میلیارد`;
    if (millions > 0) {
      result += ` و ${toPersianNumber(millions)} میلیون`;
    }
  } else if (millions > 0) {
    result += `${toPersianNumber(millions)} میلیون`;
  } else {
    const thousands = Math.floor(price / 1000);
    result += `${toPersianNumber(thousands)} هزار`;
  }
  
  return result + ' تومان';
}

// Persian provinces
export const iranProvinces = [
  'آذربایجان شرقی',
  'آذربایجان غربی',
  'اردبیل',
  'اصفهان',
  'البرز',
  'ایلام',
  'بوشهر',
  'تهران',
  'چهارمحال و بختیاری',
  'خراسان جنوبی',
  'خراسان رضوی',
  'خراسان شمالی',
  'خوزستان',
  'زنجان',
  'سمنان',
  'سیستان و بلوچستان',
  'فارس',
  'قزوین',
  'قم',
  'کردستان',
  'کرمان',
  'کرمانشاه',
  'کهگیلویه و بویراحمد',
  'گلستان',
  'گیلان',
  'لرستان',
  'مازندران',
  'مرکزی',
  'هرمزگان',
  'همدان',
  'یزد'
];

// Property types in Persian
export const propertyTypes = {
  villa: 'ویلا',
  apartment: 'آپارتمان',
  land: 'زمین',
  commercial: 'تجاری',
  industrial: 'صنعتی'
};

// Price ranges
export const priceRanges = [
  { label: 'تا ۱ میلیارد', min: 0, max: 1000000000 },
  { label: '۱ تا ۳ میلیارد', min: 1000000000, max: 3000000000 },
  { label: '۳ تا ۵ میلیارد', min: 3000000000, max: 5000000000 },
  { label: '۵ تا ۱۰ میلیارد', min: 5000000000, max: 10000000000 },
  { label: 'بالای ۱۰ میلیارد', min: 10000000000, max: Infinity }
];
