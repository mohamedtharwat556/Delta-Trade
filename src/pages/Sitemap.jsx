export default function Sitemap() {
  return (
    <div className='sitemap'>
      <h2>خريطة الموقع</h2>
      <div className='sitemap__content'>
        <section>
          <h3>الصفحات الرئيسية</h3>
          <ul>
            <li><a href='/'>الرئيسية</a></li>
            <li><a href='/products'>المنتجات</a></li>
            <li><a href='/featured'>المنتجات المميزة</a></li>
            <li><a href='/offers'>العروض</a></li>
          </ul>
        </section>
        <section>
          <h3>المعلومات</h3>
          <ul>
            <li><a href='/about'>من نحن</a></li>
            <li><a href='/privacy'>سياسة الخصوصية</a></li>
            <li><a href='/terms'>الشروط والأحكام</a></li>
            <li><a href='/faq'>الأسئلة الشائعة</a></li>
          </ul>
        </section>
        <section>
          <h3>الأقسام</h3>
          <ul>
            <li><a href='/products?category=incense'>البخور</a></li>
            <li><a href='/products?category=lighters'>الولاعات</a></li>
            <li><a href='/products?category=shoe-polish'>ملمعات الأحذية</a></li>
            <li><a href='/products?category=razors'>ماكينات الحلاقة</a></li>
          </ul>
        </section>
      </div>
    </div>
  )
}
