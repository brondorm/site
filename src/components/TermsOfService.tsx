import { motion } from "motion/react";
import { MousePointerClick, ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export function TermsOfService() {
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
            Пользовательское соглашение
          </h1>
          
          <p className="text-gray-400 mb-12">
            <strong>Дата последнего обновления:</strong> 09 октября 2025 г.
          </p>

          <div className="prose prose-invert max-w-none space-y-8">
            <p className="text-gray-300 leading-relaxed">
              Настоящее Пользовательское соглашение (далее — <em>Соглашение</em>) регулирует отношения между индивидуальным предпринимателем <strong>Кальдиным Михаилом Сергеевичем</strong>, ИНН 772024568907, ОГРНИП 324774600667292 (далее — <em>Оператор</em>, <em>Мы</em>) и любым физическим или юридическим лицом (далее — <em>Пользователь</em>), использующим сайт{" "}
              <a href="https://clicktofuture.ru" className="text-[#00D1FF] hover:text-[#A7F5FF] transition-colors">
                https://clicktofuture.ru
              </a>{" "}
              (далее — <em>Сайт</em>) и связанные с ним сервисы.
            </p>

            <p className="text-gray-300 leading-relaxed">
              Используя Сайт, Пользователь выражает полное согласие с условиями данного Соглашения. Если Пользователь не согласен с условиями — он обязан прекратить использование Сайта.
            </p>

            <section className="border-l-2 border-[#00D1FF]/30 pl-6 py-4">
              <h2 className="text-3xl mb-4 text-white">1. Предмет соглашения</h2>
              <p className="text-gray-300 leading-relaxed mb-3">
                1.1. Оператор предоставляет Пользователю доступ к функционалу Сайта и связанных сервисов: автоматизации задач с помощью искусственного интеллекта, интеграций с мессенджерами, консультационных и технических услуг.
              </p>
              <p className="text-gray-300 leading-relaxed mb-3">
                1.2. Все услуги предоставляются "как есть" (<em>as is</em>) без каких-либо гарантий результата.
              </p>
              <p className="text-gray-300 leading-relaxed">
                1.3. Использование Сайта означает принятие Пользователем всех условий настоящего Соглашения без ограничений и оговорок.
              </p>
            </section>

            <section className="border-l-2 border-[#00D1FF]/30 pl-6 py-4">
              <h2 className="text-3xl mb-4 text-white">2. Права и обязанности сторон</h2>
              <h3 className="text-2xl mb-3 text-white">2.1. Пользователь обязуется:</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
                <li>использовать Сайт исключительно в законных целях;</li>
                <li>не предпринимать действий, направленных на нарушение работы Сайта, несанкционированный доступ к данным, коду, API и инфраструктуре;</li>
                <li>не использовать Сервис для рассылки спама, мошенничества или введения в заблуждение других лиц;</li>
                <li>предоставлять достоверные контактные данные при регистрации или обращении.</li>
              </ul>

              <h3 className="text-2xl mb-3 text-white">2.2. Оператор обязуется:</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>обеспечивать доступность Сайта в пределах технических возможностей;</li>
                <li>обеспечивать защиту персональных данных Пользователей;</li>
                <li>уведомлять о существенных изменениях в условиях предоставления услуг.</li>
              </ul>
            </section>

            <section className="border-l-2 border-[#00D1FF]/30 pl-6 py-4">
              <h2 className="text-3xl mb-4 text-white">3. Интеллектуальная собственность</h2>
              <p className="text-gray-300 leading-relaxed mb-3">
                3.1. Все материалы на Сайте, включая тексты, изображения, логотип ClickToFuture, элементы дизайна, а также программный код, являются интеллектуальной собственностью Оператора.
              </p>
              <p className="text-gray-300 leading-relaxed mb-3">
                3.2. Любое копирование, распространение или использование материалов Сайта без письменного разрешения Оператора запрещено.
              </p>
              <p className="text-gray-300 leading-relaxed">
                3.3. Исключение составляют фрагменты, явно разрешённые к использованию в рамках API-интеграций.
              </p>
            </section>

            <section className="border-l-2 border-[#00D1FF]/30 pl-6 py-4">
              <h2 className="text-3xl mb-4 text-white">4. Использование AI и ограничение ответственности</h2>
              <p className="text-gray-300 leading-relaxed mb-3">
                4.1. Сервис ClickToFuture использует модели искусственного интеллекта (в т.ч. OpenAI API, Telegram Bot API и другие интеграции) для генерации ответов и автоматизации задач.
              </p>
              <p className="text-gray-300 leading-relaxed mb-3">
                4.2. Результаты работы AI-агентов могут содержать неточности, ошибки или неполные данные.
              </p>
              <p className="text-gray-300 leading-relaxed mb-3">
                4.3. Оператор не несёт ответственности за убытки, причинённые в результате использования или невозможности использования рекомендаций, ответов или данных, сгенерированных AI.
              </p>
              <p className="text-gray-300 leading-relaxed">
                4.4. Ответственность за использование информации, полученной от AI, лежит исключительно на Пользователе.
              </p>
            </section>

            <section className="border-l-2 border-[#00D1FF]/30 pl-6 py-4">
              <h2 className="text-3xl mb-4 text-white">5. Ограничение ответственности</h2>
              <p className="text-gray-300 leading-relaxed mb-3">
                5.1. Оператор не несёт ответственности:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mb-3 ml-4">
                <li>за любые сбои, ошибки или перерывы в работе Сайта;</li>
                <li>за потерю данных, вызванную действиями Пользователя или третьих лиц;</li>
                <li>за последствия использования AI для принятия решений, влияющих на бизнес, здоровье или жизнь.</li>
              </ul>
              <p className="text-gray-300 leading-relaxed">
                5.2. Сайт и сервисы предоставляются <strong>без гарантий</strong> качества, точности, полноты или пригодности для конкретных целей.
              </p>
            </section>

            <section className="border-l-2 border-[#00D1FF]/30 pl-6 py-4">
              <h2 className="text-3xl mb-4 text-white">6. Конфиденциальность</h2>
              <p className="text-gray-300 leading-relaxed mb-3">
                6.1. Обработка персональных данных осуществляется в соответствии с <strong>Политикой конфиденциальности</strong>, доступной по адресу{" "}
                <Link to="/privacy" className="text-[#00D1FF] hover:text-[#A7F5FF] transition-colors">
                  https://clicktofuture.ru/privacy
                </Link>.
              </p>
              <p className="text-gray-300 leading-relaxed">
                6.2. Пользователь, используя Сайт, выражает согласие на обработку своих персональных данных в объёме и целях, указанных в указанной Политике.
              </p>
            </section>

            <section className="border-l-2 border-[#00D1FF]/30 pl-6 py-4">
              <h2 className="text-3xl mb-4 text-white">7. Порядок разрешения споров</h2>
              <p className="text-gray-300 leading-relaxed mb-3">
                7.1. Все споры и разногласия решаются путём переговоров.
              </p>
              <p className="text-gray-300 leading-relaxed mb-3">
                7.2. При невозможности урегулирования — спор передаётся в суд по месту регистрации Оператора.
              </p>
              <p className="text-gray-300 leading-relaxed">
                7.3. Применимое право — законодательство Российской Федерации.
              </p>
            </section>

            <section className="border-l-2 border-[#00D1FF]/30 pl-6 py-4">
              <h2 className="text-3xl mb-4 text-white">8. Заключительные положения</h2>
              <p className="text-gray-300 leading-relaxed mb-3">
                8.1. Оператор имеет право изменять условия Соглашения в одностороннем порядке. Новая редакция вступает в силу с момента публикации на Сайте.
              </p>
              <p className="text-gray-300 leading-relaxed">
                8.2. Актуальная версия Соглашения всегда доступна по адресу{" "}
                <a href="https://clicktofuture.ru/terms" className="text-[#00D1FF] hover:text-[#A7F5FF] transition-colors">
                  https://clicktofuture.ru/terms
                </a>.
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
                  <a href="mailto:support@clicktofuture.ru" className="text-[#00D1FF] hover:text-[#A7F5FF] transition-colors">
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
