export const navigation = [
  { to: '/', label: 'الرئيسية' },
  { to: '/products', label: 'المنتجات' },
  { to: '/categories', label: 'الأقسام' },
  { to: '/wholesale', label: 'البيع بالجملة' },
  { to: '/wishlist', label: 'المفضلة' },
  { to: '/track', label: 'تتبع الطلب' },
]

export const footerLinks = [
  {
    title: 'المتجر',
    items: [
      { to: '/products', label: 'كل المنتجات' },
      { to: '/discounted', label: 'المنتجات المخفضة' },
      { to: '/featured-today', label: 'مميز اليوم' },
      { to: '/brands', label: 'العلامات التجارية' },
      { to: '/wishlist', label: 'المفضلة' },
      { to: '/cart', label: 'سلة المشتريات' },
    ],
  },
  {
    title: 'الأقسام',
    items: [
      { to: '/categories', label: 'كل الأقسام' },
      { to: '/products?category=incense', label: 'أعواد البخور' },
      { to: '/products?category=lighters', label: 'الولّاعات' },
      { to: '/products?category=matches', label: 'علب الكبريت' },
    ],
  },
  {
    title: 'خدمة العملاء',
    items: [
      { to: '/wholesale', label: 'شروط الجملة' },
      { to: '/track', label: 'تتبع الطلب' },
      { to: '/sitemap', label: 'خريطة الموقع' },
      { to: '/privacy', label: 'سياسة الخصوصية' },
      { to: '/about', label: 'عن الشركة' },
      { to: '/contact', label: 'تواصل معنا' },
    ],
  },
]
