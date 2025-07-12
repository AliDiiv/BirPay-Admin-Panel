// تبدیل اعداد فارسی به انگلیسی
export const PetoEn = function (string = '0') {
  return string.replace(/[\u06F0-\u06F9]/g, (d) => (d.charCodeAt(0) - 1776).toString())
}

// تبدیل اعداد انگلیسی به فارسی
export const EntoFa = function (string = '0') {
  return string.replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)])
}

// جداسازی اعداد به 4-3-4 برای مثال کد ملی یا شماره کارت
export const separateNumbers = function (string = '0') {
  string = PetoEn(string)
  const numbers = string.match(/\d+/g)
  if (!numbers) return []

  const separatedNumbers: any[] = []
  numbers.forEach((number) => {
    const separatedNumber = []
    let currentIndex = 0
    separatedNumber.push(number.substr(currentIndex, 4))
    currentIndex += 4
    separatedNumber.push(number.substr(currentIndex, 3))
    currentIndex += 3
    separatedNumber.push(number.substr(currentIndex, 4))

    separatedNumbers.push(separatedNumber.join(' '))
  })

  return separatedNumbers[0]
}

// فرمت اعداد به فارسی با کاما
export const formatNumberToPersian = (number = '') => {
  if (number === '') return ''
  return EntoFa(Number(number).toLocaleString('fa'))
}

// حذف کاراکترهای غیر عددی از رشته
export const removeNonNumericCharacters = (str: string) => {
  return str.replace(/[^\d]/g, '')
}

// تقسیم اعداد به گروه‌های ۴تایی مثل کارت بانکی
export const separateNumbersTo4Groups = (string: string) => {
  string = String(string)
  const numbers = string.match(/\d+/g)
  if (!numbers) return ''

  const combinedNumbers = numbers.join('')
  const maxNumbers = Math.min(combinedNumbers.length, 16)
  const formattedNumbers = combinedNumbers.substr(0, maxNumbers)

  const separatedNumbers = []
  for (let i = 0; i < formattedNumbers.length; i += 4) {
    separatedNumbers.push(formattedNumbers.substr(i, 4))
  }

  return EntoFa(separatedNumbers.join('-'))
}

// بازگرداندن گروه‌های کارت به عدد پیوسته
export const combineNumbersFromGroups = (string = '') => {
  return string.replace(/-/g, '')
}

// شمارش تعداد اعشار در عدد
export const countDecimals = function (val: number) {
  if (Math.floor(val.valueOf()) === val.valueOf()) return 0
  const str = val.toString()
  if (str.indexOf('.') !== -1 && str.indexOf('-') !== -1) {
    return str.split('-')[1]?.length || 0
  } else if (str.indexOf('.') !== -1) {
    return str.split('.')[1]?.length || 0
  }
  return 0
}
