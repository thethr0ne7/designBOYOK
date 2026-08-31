import { useMemo, useState } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  BriefcaseBusiness,
  CalendarClock,
  Check,
  ChevronDown,
  FileCheck2,
  GraduationCap,
  HardHat,
  Headphones,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  Wrench,
} from 'lucide-react';

const programs = [
  {
    title: 'Сварщик ручной дуговой сварки',
    category: 'Строительство',
    duration: 'от 160 часов',
    format: 'очно / очно-заочно',
    price: 'от 12 900 ₽',
    document: 'Документ по программе',
    featured: true,
  },
  {
    title: 'Стропальщик',
    category: 'Промышленность',
    duration: 'от 72 часов',
    format: 'очно / смешанно',
    price: 'от 7 900 ₽',
    document: 'Документ по программе',
  },
  {
    title: 'Машинист крана автомобильного',
    category: 'Транспорт',
    duration: 'от 320 часов',
    format: 'очно',
    price: 'по запросу',
    document: 'Документ по программе',
    featured: true,
  },
  {
    title: 'Рабочий люльки',
    category: 'Промышленность',
    duration: 'от 40 часов',
    format: 'очно / смешанно',
    price: 'от 5 900 ₽',
    document: 'Документ по программе',
  },
  {
    title: 'Маляр',
    category: 'Строительство',
    duration: 'от 144 часов',
    format: 'очно / очно-заочно',
    price: 'от 9 900 ₽',
    document: 'Документ по программе',
  },
  {
    title: 'Штукатур',
    category: 'Строительство',
    duration: 'от 144 часов',
    format: 'очно / очно-заочно',
    price: 'от 9 900 ₽',
    document: 'Документ по программе',
  },
  {
    title: 'Электромонтер',
    category: 'Энергетика',
    duration: 'от 240 часов',
    format: 'очно / смешанно',
    price: 'от 14 900 ₽',
    document: 'Документ по программе',
    featured: true,
  },
  {
    title: 'Оператор котельной',
    category: 'ЖКХ',
    duration: 'от 160 часов',
    format: 'очно / смешанно',
    price: 'от 11 900 ₽',
    document: 'Документ по программе',
  },
];

const categories = ['Все', ...new Set(programs.map((program) => program.category))];

function App() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Все');
  const [submitted, setSubmitted] = useState(false);
  const [faqOpen, setFaqOpen] = useState(0);

  const filteredPrograms = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return programs.filter((program) => {
      const byCategory = category === 'Все' || program.category === category;
      const byQuery = !normalized || `${program.title} ${program.category}`.toLowerCase().includes(normalized);
      return byCategory && byQuery;
    });
  }, [query, category]);

  const scrollToLead = () => document.getElementById('lead')?.scrollIntoView({ behavior: 'smooth' });

  const submitLead = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="site-shell">
      <header className="topbar">
        <div className="container topbar-inner">
          <a className="brand" href="#top" aria-label="ПрофСтарт — на главную">
            <span className="brand-mark" aria-hidden="true"><GraduationCap size={24} strokeWidth={1.8} /></span>
            <span><b>Проф</b>Старт</span>
          </a>
          <nav className="desktop-nav" aria-label="Основная навигация">
            <a href="#programs">Программы</a>
            <a href="#process">Как проходит обучение</a>
            <a href="#documents">Документы</a>
            <a href="#faq">Вопросы</a>
          </nav>
          <button className="button button-small" onClick={scrollToLead}>Получить консультацию</button>
        </div>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="hero-grid container">
            <div className="hero-copy">
              <div className="eyebrow"><Sparkles size={16} aria-hidden="true" /> Профессиональное обучение для взрослых</div>
              <h1>Новая квалификация. Понятный путь от заявки до обучения.</h1>
              <p className="hero-lead">Подберите программу по профессии, сроку и формату. Мы поможем разобраться в требованиях, документах и вариантах обучения до оплаты.</p>
              <div className="hero-actions">
                <button className="button button-primary" onClick={scrollToLead}>
                  Подобрать программу <ArrowRight size={18} aria-hidden="true" />
                </button>
                <a className="text-link" href="#programs">Смотреть каталог</a>
              </div>
              <div className="trust-row" aria-label="Преимущества">
                <span><Check size={16} aria-hidden="true" /> Без скрытых условий</span>
                <span><Check size={16} aria-hidden="true" /> Консультация до записи</span>
                <span><Check size={16} aria-hidden="true" /> Условия по каждой программе</span>
              </div>
            </div>

            <aside className="hero-panel" aria-label="Подбор программы">
              <div className="hero-panel-head">
                <span className="icon-tile"><BookOpenCheck size={22} aria-hidden="true" /></span>
                <div><span className="muted-label">Быстрый старт</span><strong>Подбор за 2 минуты</strong></div>
              </div>
              <div className="hero-steps">
                <div><span>01</span><p><strong>Выберите направление</strong><br />По профессии или сфере.</p></div>
                <div><span>02</span><p><strong>Уточним условия</strong><br />Сроки, формат, требования.</p></div>
                <div><span>03</span><p><strong>Получите план</strong><br />Что нужно для зачисления.</p></div>
              </div>
              <button className="button button-dark" onClick={scrollToLead}>Получить план обучения</button>
            </aside>
          </div>
        </section>

        <section className="signals" aria-label="Ключевые параметры">
          <div className="container signal-grid">
            <div><CalendarClock aria-hidden="true" /><span><strong>Гибкие сроки</strong><small>в зависимости от программы</small></span></div>
            <div><Users aria-hidden="true" /><span><strong>Для взрослых</strong><small>с учетом входных требований</small></span></div>
            <div><FileCheck2 aria-hidden="true" /><span><strong>Прозрачные документы</strong><small>вид документа указан заранее</small></span></div>
            <div><Headphones aria-hidden="true" /><span><strong>Сопровождение</strong><small>до начала обучения</small></span></div>
          </div>
        </section>

        <section className="section" id="programs">
          <div className="container">
            <div className="section-heading split-heading">
              <div>
                <span className="section-kicker">Каталог</span>
                <h2>Выберите профессию, с которой хотите начать</h2>
              </div>
              <p>Собрали востребованные направления в одном месте. Стоимость и продолжительность ниже — демонстрационные данные для макета и должны быть подтверждены перед публикацией.</p>
            </div>

            <div className="catalog-tools">
              <label className="search-field">
                <Search size={19} aria-hidden="true" />
                <span className="sr-only">Поиск программы</span>
                <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Например, сварщик или электромонтер" />
              </label>
              <div className="chips" role="group" aria-label="Фильтр по направлению">
                {categories.map((item) => (
                  <button key={item} className={category === item ? 'chip active' : 'chip'} onClick={() => setCategory(item)} aria-pressed={category === item}>{item}</button>
                ))}
              </div>
            </div>

            <div className="course-grid" aria-live="polite">
              {filteredPrograms.map((program) => (
                <article className="course-card" key={program.title}>
                  <div className="course-topline">
                    <span className="course-category">{program.category}</span>
                    {program.featured && <span className="popular-badge"><BadgeCheck size={15} aria-hidden="true" /> Популярно</span>}
                  </div>
                  <h3>{program.title}</h3>
                  <dl className="course-meta">
                    <div><dt>Срок</dt><dd>{program.duration}</dd></div>
                    <div><dt>Формат</dt><dd>{program.format}</dd></div>
                    <div><dt>Результат</dt><dd>{program.document}</dd></div>
                  </dl>
                  <div className="course-footer">
                    <div><small>Стоимость</small><strong>{program.price}</strong></div>
                    <button className="icon-button" onClick={scrollToLead} aria-label={`Узнать условия программы ${program.title}`}><ArrowRight size={20} /></button>
                  </div>
                </article>
              ))}
            </div>
            {filteredPrograms.length === 0 && <div className="empty-state">По вашему запросу ничего не найдено. Оставьте заявку — подберём ближайший вариант вручную.</div>}
          </div>
        </section>

        <section className="section soft-section" id="process">
          <div className="container">
            <div className="section-heading centered-heading">
              <span className="section-kicker">Процесс</span>
              <h2>Без хаоса между “хочу учиться” и первым занятием</h2>
              <p>Путь разбит на четыре понятных шага. На каждом этапе вы знаете, что требуется дальше.</p>
            </div>
            <div className="process-grid">
              {[
                ['01', Search, 'Подбор', 'Определяем профессию и проверяем, подходит ли формат обучения.'],
                ['02', ShieldCheck, 'Проверка условий', 'Уточняем входные требования и перечень необходимых документов.'],
                ['03', FileCheck2, 'Оформление', 'Фиксируем программу, сроки, стоимость и порядок зачисления.'],
                ['04', GraduationCap, 'Обучение', 'Проходите программу и итоговую аттестацию в установленном формате.'],
              ].map(([number, Icon, title, text]) => (
                <article className="process-card" key={number}>
                  <div className="process-number">{number}</div>
                  <span className="process-icon"><Icon size={22} aria-hidden="true" /></span>
                  <h3>{title}</h3><p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="documents">
          <div className="container document-grid">
            <div>
              <span className="section-kicker">До оплаты</span>
              <h2>Сначала — условия программы. Потом — решение.</h2>
              <p className="lead-copy">Мы не обещаем один и тот же документ для всех курсов. Вид документа, требования к слушателю и порядок итоговой аттестации зависят от конкретной программы и основания обучения.</p>
              <ul className="check-list">
                <li><Check aria-hidden="true" /> Вид итогового документа указывается по программе.</li>
                <li><Check aria-hidden="true" /> Требования к поступлению сообщаются до заключения договора.</li>
                <li><Check aria-hidden="true" /> Продолжительность и формат фиксируются до старта.</li>
                <li><Check aria-hidden="true" /> Юридические формулировки проверяются перед публикацией.</li>
              </ul>
            </div>
            <div className="document-card">
              <div className="document-card-top"><span className="icon-tile"><FileCheck2 size={24} aria-hidden="true" /></span><span>Пример карточки условий</span></div>
              <div className="document-lines">
                <div><span>Программа</span><strong>Стропальщик</strong></div>
                <div><span>Объём</span><strong>72+ часа</strong></div>
                <div><span>Формат</span><strong>Очно / смешанно</strong></div>
                <div><span>Документ</span><strong>По утвержденной программе</strong></div>
              </div>
              <div className="document-note">Перед запуском продаж реальные данные должны быть синхронизированы с утверждённой программой, договором и документами образовательной организации.</div>
            </div>
          </div>
        </section>

        <section className="section dark-section">
          <div className="container value-grid">
            <div>
              <span className="section-kicker light-kicker">Почему это удобно</span>
              <h2>Профессиональное обучение без лишней бюрократии в интерфейсе</h2>
              <p>Сайт объясняет пользователю только то, что влияет на решение: чему учат, сколько длится, сколько стоит, что нужно для поступления и какой следующий шаг.</p>
            </div>
            <div className="value-cards">
              <article><Wrench aria-hidden="true" /><strong>Практичные профессии</strong><span>Каталог строится вокруг конкретных квалификаций.</span></article>
              <article><BriefcaseBusiness aria-hidden="true" /><strong>Для работы</strong><span>Фокус на прикладном результате, а не абстрактном обучении.</span></article>
              <article><ShieldCheck aria-hidden="true" /><strong>Проверяемые условия</strong><span>Нет неподтвержденных обещаний и “мелкого шрифта”.</span></article>
            </div>
          </div>
        </section>

        <section className="section" id="faq">
          <div className="container faq-grid">
            <div className="section-heading faq-heading">
              <span className="section-kicker">FAQ</span>
              <h2>Что обычно спрашивают до записи</h2>
              <p>Если вопрос зависит от конкретной программы, это прямо указано в ответе.</p>
            </div>
            <div className="faq-list">
              {[
                ['Можно ли учиться без профильного образования?', 'Зависит от профессии и вида программы. Перед записью проверяются входные требования конкретного курса.'],
                ['Можно ли пройти обучение дистанционно?', 'Не для каждой профессии. Теория может быть доступна в смешанном формате, но практическая часть и аттестация могут требовать очного присутствия.'],
                ['Какой документ я получу?', 'Точный вид документа определяется программой и правовым основанием обучения. Он должен быть указан до заключения договора.'],
                ['Можно ли обучить сотрудников организации?', 'Да, сайт можно дополнить корпоративным сценарием: заявка на группу, договор с организацией, согласование графика и документов.'],
              ].map(([question, answer], index) => (
                <div className="faq-item" key={question}>
                  <button className="faq-button" onClick={() => setFaqOpen(faqOpen === index ? -1 : index)} aria-expanded={faqOpen === index}>
                    <span>{question}</span><ChevronDown size={20} aria-hidden="true" />
                  </button>
                  {faqOpen === index && <div className="faq-answer"><p>{answer}</p></div>}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section lead-section" id="lead">
          <div className="container lead-grid">
            <div>
              <span className="section-kicker">Следующий шаг</span>
              <h2>Подберём программу под вашу задачу</h2>
              <p>Оставьте контакты и напишите профессию. Менеджер сможет вернуть вам конкретный вариант с требованиями, сроком и стоимостью.</p>
              <div className="lead-points">
                <span><Check size={17} aria-hidden="true" /> Без обязательства оплачивать</span>
                <span><Check size={17} aria-hidden="true" /> Можно задать вопрос по документам</span>
              </div>
            </div>
            <form className="lead-form" onSubmit={submitLead} noValidate>
              {submitted ? (
                <div className="success-state" role="status">
                  <BadgeCheck size={34} aria-hidden="true" />
                  <h3>Заявка принята в демо-режиме</h3>
                  <p>Форма уже отрабатывает интерфейсный сценарий. Для реальных заявок нужно подключить CRM, Telegram, email или backend.</p>
                  <button type="button" className="button button-light" onClick={() => setSubmitted(false)}>Отправить ещё одну</button>
                </div>
              ) : (
                <>
                  <div className="form-row">
                    <label>Имя<input name="name" autoComplete="name" required placeholder="Как к вам обращаться" /></label>
                    <label>Телефон<input name="phone" type="tel" autoComplete="tel" required placeholder="+7 999 000-00-00" /></label>
                  </div>
                  <label>Какая профессия интересует?<input name="program" placeholder="Например, сварщик" /></label>
                  <label className="consent"><input type="checkbox" required /><span>Я согласен на обработку данных для ответа на заявку.</span></label>
                  <button className="button button-primary form-submit" type="submit">Получить консультацию <ArrowRight size={18} aria-hidden="true" /></button>
                  <small className="form-note">Текст согласия и политика обработки данных должны быть заменены на юридически утверждённые перед публикацией.</small>
                </>
              )}
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <a className="brand footer-brand" href="#top"><span className="brand-mark" aria-hidden="true"><GraduationCap size={24} /></span><span><b>Проф</b>Старт</span></a>
            <p>Витрина программ профессионального обучения.</p>
          </div>
          <div><strong>Навигация</strong><a href="#programs">Программы</a><a href="#process">Процесс</a><a href="#documents">Документы</a></div>
          <div><strong>Информация</strong><a href="#faq">Вопросы</a><a href="#lead">Оставить заявку</a><span>Политика — добавить перед запуском</span></div>
        </div>
        <div className="container footer-bottom"><span>© 2026 ПрофСтарт</span><span>Демонстрационная версия коммерческого сайта</span></div>
      </footer>
    </div>
  );
}

export default App;
