import { motion } from "motion/react";
import { MousePointerClick, ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#0C0C0C] text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#0C0C0C]/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-4">
            <motion.div
              className="w-12 h-12 bg-gradient-to-r from-[#00D1FF] to-[#A7F5FF] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,209,255,0.4)]"
              whileHover={{ scale: 1.1 }}
            >
              <MousePointerClick className="w-6 h-6 text-black" />
            </motion.div>
            <span className="text-2xl text-white">ClickToFuture</span>
          </Link>
          
          <Link to="/">
            <Button 
              variant="outline"
              className="border-[#00D1FF]/30 text-[#00D1FF] hover:bg-[#00D1FF]/10 hover:border-[#00D1FF] gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              На главную
            </Button>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl mb-4 bg-gradient-to-r from-[#00D1FF] to-[#A7F5FF] bg-clip-text text-transparent">
            Политика конфиденциальности
          </h1>
          
          <p className="text-gray-400 mb-12">
            <strong>Дата последнего обновления:</strong> 09 октября 2025 г.
          </p>

          <div className="prose prose-invert max-w-none space-y-8">
            <p className="text-gray-300 leading-relaxed">
              Настоящая Политика конфиденциальности (далее — <em>Политика</em>) определяет порядок обработки и защиты персональных данных пользователей сайта{" "}
              <a href="https://clicktofuture.ru" className="text-[#00D1FF] hover:text-[#A7F5FF] transition-colors">
                https://clicktofuture.ru
              </a>{" "}
              (далее — <em>Сайт</em>), принадлежащего индивидуальному предпринимателю <strong> Кальдину Михаилу Сергеевичу</strong>, ИНН 772024568907, ОГРНИП 324774600667292 (далее — <em>Оператор</em>).
            </p>

            <p className="text-gray-300 leading-relaxed">
              Используя Сайт, вы подтверждаете, что ознакомлены с данной Политикой и соглашаетесь с её условиями.
            </p>

            <section className="border-l-2 border-[#00D1FF]/30 pl-6 py-4">
              <h2 className="text-3xl mb-4 text-white">1. Общие положения</h2>
              <p className="text-gray-300 leading-relaxed mb-3">
                1.1. Настоящая Политика разработана в соответствии с Федеральным законом № 152-ФЗ «О персональных данных», а также иными нормативными актами РФ.
              </p>
              <p className="text-gray-300 leading-relaxed mb-3">
                1.2. Оператор обеспечивает конфиденциальность и безопасность обрабатываемых персональных данных пользователей.
              </p>
              <p className="text-gray-300 leading-relaxed">
                1.3. Использование Сайта означает безоговорочное согласие пользователя с данной Политикой и условиями обработки его персональных данных.
              </p>
            </section>

            <section className="border-l-2 border-[#00D1FF]/30 pl-6 py-4">
              <h2 className="text-3xl mb-4 text-white">2. Состав собираемых данных</h2>
              <p className="text-gray-300 leading-relaxed mb-3">
                2.1. Мы можем собирать и обрабатывать следующие данные пользователей:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mb-3 ml-4">
                <li>имя, фамилия (если указываются);</li>
                <li>адрес электронной почты;</li>
                <li>логин Telegram или других мессенджеров;</li>
                <li>номер телефона (при необходимости обратной связи);</li>
                <li>данные, передаваемые автоматически (IP-адрес, cookies, данные браузера и устройства);</li>
                <li>переписка с нашим AI-ассистентом, если она направлена через интеграции (Telegram, веб-форма и т.п.).</li>
              </ul>
              <p className="text-gray-300 leading-relaxed">
                2.2. Оператор <strong>не обрабатывает специальные категории персональных данных</strong> (о здоровье, политических взглядах, религии и т.д.).
              </p>
            </section>

            <section className="border-l-2 border-[#00D1FF]/30 pl-6 py-4">
              <h2 className="text-3xl mb-4 text-white">3. Цели обработки персональных данных</h2>
              <p className="text-gray-300 leading-relaxed mb-3">
                Персональные данные обрабатываются для следующих целей:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>предоставление доступа к сервисам и функционалу Сайта;</li>
                <li>коммуникация с пользователями (ответы на запросы, обратная связь, поддержка);</li>
                <li>улучшение качества сервиса и пользовательского опыта;</li>
                <li>рассылка уведомлений и новостей (только при согласии пользователя);</li>
                <li>выполнение требований законодательства РФ.</li>
              </ul>
            </section>

            <section className="border-l-2 border-[#00D1FF]/30 pl-6 py-4">
              <h2 className="text-3xl mb-4 text-white">4. Правовые основания обработки</h2>
              <p className="text-gray-300 leading-relaxed mb-3">
                4.1. Основанием обработки персональных данных является:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>добровольное согласие пользователя;</li>
                <li>необходимость исполнения договора или соглашения между пользователем и Оператором;</li>
                <li>законные интересы Оператора, направленные на развитие и улучшение сервиса.</li>
              </ul>
            </section>

            <section className="border-l-2 border-[#00D1FF]/30 pl-6 py-4">
              <h2 className="text-3xl mb-4 text-white">5. Хранение и защита данных</h2>
              <p className="text-gray-300 leading-relaxed mb-3">
                5.1. Персональные данные хранятся в защищённых базах данных на серверах, расположенных на территории Российской Федерации.
              </p>
              <p className="text-gray-300 leading-relaxed mb-3">
                5.2. Срок хранения персональных данных — не более чем необходимо для целей обработки, но не более <strong>3 лет</strong> с момента последнего взаимодействия пользователя с сервисом.
              </p>
              <p className="text-gray-300 leading-relaxed">
                5.3. Оператор принимает все разумные меры защиты данных от несанкционированного доступа, уничтожения, изменения или распространения.
              </p>
            </section>

            <section className="border-l-2 border-[#00D1FF]/30 pl-6 py-4">
              <h2 className="text-3xl mb-4 text-white">6. Передача данных третьим лицам</h2>
              <p className="text-gray-300 leading-relaxed mb-3">
                6.1. Персональные данные могут быть переданы:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mb-3 ml-4">
                <li>по требованию государственных органов РФ в рамках законодательства;</li>
                <li>партнёрам и подрядчикам Оператора (например, провайдерам хостинга, платёжным системам, API-сервисам) — только в объёме, необходимом для предоставления услуг.</li>
              </ul>
              <p className="text-gray-300 leading-relaxed">
                6.2. При работе с AI-интеграциями (например, OpenAI API, Telegram Bot API) часть данных может обрабатываться этими сервисами в соответствии с их собственными политиками конфиденциальности.
              </p>
            </section>

            <section className="border-l-2 border-[#00D1FF]/30 pl-6 py-4">
              <h2 className="text-3xl mb-4 text-white">7. Права пользователя</h2>
              <p className="text-gray-300 leading-relaxed mb-3">
                Пользователь имеет право:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mb-3 ml-4">
                <li>получать информацию об обработке своих персональных данных;</li>
                <li>требовать уточнения, блокировки или удаления своих данных;</li>
                <li>
                  отозвать согласие на обработку данных, направив запрос на почту:{" "}
                  <a href="mailto:clicktofuture@yandex.com" className="text-[#00D1FF] hover:text-[#A7F5FF] transition-colors">
                    clicktofuture@yandex.com
                  </a>
                  .
                </li>
              </ul>
            </section>

            <section className="border-l-2 border-[#00D1FF]/30 pl-6 py-4">
              <h2 className="text-3xl mb-4 text-white">8. Использование файлов cookies</h2>
              <p className="text-gray-300 leading-relaxed mb-3">
                8.1. Сайт может использовать файлы cookies для улучшения работы и персонализации контента.
              </p>
              <p className="text-gray-300 leading-relaxed">
                8.2. Пользователь может в любой момент отключить cookies в настройках браузера, однако это может ограничить функциональность Сайта.
              </p>
            </section>

            <section className="border-l-2 border-[#00D1FF]/30 pl-6 py-4">
              <h2 className="text-3xl mb-4 text-white">9. Ответственность</h2>
              <p className="text-gray-300 leading-relaxed">
                Оператор не несёт ответственности за действия третьих лиц, получивших доступ к персональным данным вследствие использования незащищённых каналов связи или ошибок самого пользователя.
              </p>
            </section>

            <section className="border-l-2 border-[#00D1FF]/30 pl-6 py-4">
              <h2 className="text-3xl mb-4 text-white">10. Изменения в Политике</h2>
              <p className="text-gray-300 leading-relaxed mb-3">
                10.1. Оператор вправе изменять настоящую Политику без предварительного уведомления пользователей.
              </p>
              <p className="text-gray-300 leading-relaxed">
                10.2. Новая редакция Политики вступает в силу с момента её публикации на Сайте.
              </p>
            </section>

            <section className="border-l-2 border-[#00D1FF]/30 pl-6 py-4 bg-[#1B1F2A]/30 rounded-r-lg">
              <h2 className="text-3xl mb-4 text-white">Контакты Оператора:</h2>
              <div className="text-gray-300 space-y-2">
                <p>ИП Кальдин Михаил Сергеевич</p>
                <p>ИНН 772024568907</p>
                <p>ОГРНИП 324774600667292</p>
                <p>
                  E-mail:{" "}
                  <a href="mailto:clicktofuture@yandex.com" className="text-[#00D1FF] hover:text-[#A7F5FF] transition-colors">
                    clicktofuture@yandex.com
                  </a>
                </p>
              </div>
            </section>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-24 py-8">
        <div className="max-w-4xl mx-auto px-6 text-center text-gray-500">
          <p>&copy; 2025 ClickToFuture. Будущее клиентской поддержки.</p>
        </div>
      </footer>
    </div>
  );
}
