import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { ArrowRight, Mail, Phone, Shield, MousePointerClick, X } from "lucide-react";
import logoImage from "figma:asset/e670149348a17ae91dd5f254be5036d57e752682.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export function FinalCTA() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [contactMethod, setContactMethod] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    telegram: "",
    email: "",
    phone: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Helper function to map contact method to Russian label
  const mapMethod = (method: string): string => {
    switch (method) {
      case "telegram":
        return "Telegram";
      case "email":
        return "Почта";
      case "phone":
        return "Телефон";
      default:
        return "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    // Validate required fields based on contact method
    if (!formData.name.trim()) {
      setSubmitError("Пожалуйста, укажите ваше имя");
      return;
    }

    if (!contactMethod) {
      setSubmitError("Пожалуйста, выберите способ связи");
      return;
    }

    // Validate specific contact field
    if (contactMethod === "telegram" && !formData.telegram.trim()) {
      setSubmitError("Пожалуйста, укажите ваш Telegram никнейм");
      return;
    }

    if (contactMethod === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email.trim() || !emailRegex.test(formData.email)) {
        setSubmitError("Пожалуйста, укажите корректный email");
        return;
      }
    }

    if (contactMethod === "phone") {
      const phoneDigits = formData.phone.replace(/\D/g, "");
      if (!formData.phone.trim() || phoneDigits.length < 10) {
        setSubmitError("Пожалуйста, укажите корректный номер телефона");
        return;
      }
    }

    // Send to n8n webhook
    setIsSubmitting(true);

    try {
      const response = await fetch("https://n8n.aiflownow.ru/webhook/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Webhook-Token": "CTF-2025-LEAD"
        },
        body: JSON.stringify({
          name: formData.name,
          method: mapMethod(contactMethod),
          telegram: formData.telegram || "",
          email: formData.email || "",
          phone: formData.phone || ""
        })
      });

      const data = await response.json();

      if (response.ok && data.ok === true) {
        // Success
        setSubmitSuccess(true);
      } else {
        // Error from server
        setSubmitError(data.message || "Произошла ошибка при отправке. Попробуйте снова.");
      }
    } catch (error) {
      setSubmitError("Не удалось отправить форму. Проверьте соединение и попробуйте снова.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetModal = () => {
    setIsModalOpen(false);
    setShowForm(false);
    setContactMethod("");
    setFormData({ name: "", telegram: "", email: "", phone: "" });
    setSubmitError("");
    setSubmitSuccess(false);
  };

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-[#0C0C0C] via-[#1B1F2A] to-[#0C0C0C] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          className="w-full h-full"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(0,209,255,0.3) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(167,245,255,0.3) 0%, transparent 50%)
            `
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <motion.h2 
            className="text-4xl md:text-6xl text-white mb-8"
            style={{ lineHeight: 1.1 }}
          >
            Попробуй, как работает бот
          </motion.h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Протестируй демо и посмотри, как легко можно разгрузить свою команду.
          </p>

          <motion.div
            className="flex justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-[#00D1FF] to-[#0099CC] hover:from-[#A7F5FF] hover:to-[#00D1FF] text-black px-12 py-6 text-lg transition-all duration-300 shadow-[0_0_30px_rgba(0,209,255,0.3)] hover:shadow-[0_0_50px_rgba(0,209,255,0.5)] group text-[16px]"
              onClick={() => setIsModalOpen(true)}
            >
              Запросить демо-доступ
            </Button>
          </motion.div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {[
            { icon: Shield, text: "Безопасность данных гарантирована" },
            { icon: Phone, text: "Поддержка 24/7" },
            { icon: Mail, text: "Быстрая интеграция" }
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-center gap-1 text-gray-400">
              <item.icon className="w-5 h-5 text-[#00D1FF] flex-shrink-0" />
              <span>{item.text}</span>
            </div>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-white/10 pt-12"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <motion.div
                className="w-16 h-16 bg-gradient-to-r from-[#00D1FF] to-[#A7F5FF] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,209,255,0.4)]"
                whileHover={{ scale: 1.1 }}
              >
                <MousePointerClick className="w-9 h-9 text-black" />
              </motion.div>
              <span className="text-4xl text-white">ClickToFuture</span>
            </div>

            {/* Links */}
            <div className="flex flex-col md:flex-row gap-6 text-gray-400">
              <Link to="/privacy" className="hover:text-[#00D1FF] transition-colors">
                Политика конфиденциальности
              </Link>
              <Link to="/terms" className="hover:text-[#00D1FF] transition-colors">
                Пользовательское соглашение
              </Link>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/5 text-center text-gray-500">
            <p>&copy; 2025 ClickToFuture. Будущее клиентской поддержки.</p>
          </div>
        </motion.footer>
      </div>

      {/* Ambient Light Effects */}
      <motion.div
        className="absolute top-1/4 left-10 w-32 h-32 bg-[#00D1FF]/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-10 w-40 h-40 bg-[#A7F5FF]/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
              onClick={resetModal}
            />
            
            {/* Modal Content */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3 }}
                className="bg-[#1B1F2A] border border-[#00D1FF]/30 rounded-xl shadow-[0_0_50px_rgba(0,209,255,0.3)] max-w-md w-full relative"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={resetModal}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="p-8">
                  <AnimatePresence mode="wait">
                    {submitSuccess ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="text-center"
                      >
                        <h3 className="text-2xl text-white mb-4">
                          Спасибо!
                        </h3>
                        <p className="text-gray-300 mb-6">
                          Ваша заявка успешно отправлена. Мы свяжемся с вами в ближайшее время.
                        </p>
                        <Button
                          size="lg"
                          className="bg-gradient-to-r from-[#00D1FF] to-[#0099CC] hover:from-[#A7F5FF] hover:to-[#00D1FF] text-black transition-all duration-300 shadow-[0_0_20px_rgba(0,209,255,0.3)] hover:shadow-[0_0_30px_rgba(0,209,255,0.5)]"
                          onClick={resetModal}
                        >
                          Закрыть
                        </Button>
                      </motion.div>
                    ) : !showForm ? (
                      <motion.div
                        key="initial"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <h3 className="text-2xl text-white mb-6">
                          Вы можете заполнить форму, чтобы мы с вами связались, или написать нам сами.
                        </h3>
                        
                        <div className="flex flex-col gap-4">
                          <Button
                            size="lg"
                            className="bg-gradient-to-r from-[#00D1FF] to-[#0099CC] hover:from-[#A7F5FF] hover:to-[#00D1FF] text-black transition-all duration-300 shadow-[0_0_20px_rgba(0,209,255,0.3)] hover:shadow-[0_0_30px_rgba(0,209,255,0.5)]"
                            onClick={() => window.open("https://t.me/ClickToFuture_bot", "_blank")}
                          >
                            Написать самому
                          </Button>
                          
                          <Button
                            variant="outline"
                            size="lg"
                            className="border-[#00D1FF]/30 text-[#00D1FF] hover:bg-[#00D1FF]/10 hover:border-[#00D1FF] transition-all duration-300"
                            onClick={() => setShowForm(true)}
                          >
                            Заполнить форму
                          </Button>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="form"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        onSubmit={handleSubmit}
                        className="space-y-6"
                      >
                        <h3 className="text-2xl text-white mb-6">
                          Заполните форму
                        </h3>

                        {/* Name Field */}
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-gray-300">
                            Имя
                          </Label>
                          <Input
                            id="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="bg-[#0C0C0C] border-[#00D1FF]/30 text-white focus:border-[#00D1FF] focus:ring-[#00D1FF]/20"
                          />
                        </div>

                        {/* Contact Method Select */}
                        <div className="space-y-2">
                          <Label htmlFor="contact-method" className="text-gray-300">
                            Как связаться
                          </Label>
                          <Select value={contactMethod} onValueChange={setContactMethod}>
                            <SelectTrigger className="bg-[#0C0C0C] border-[#00D1FF]/30 text-white focus:border-[#00D1FF] focus:ring-[#00D1FF]/20">
                              <SelectValue placeholder="Выберите способ связи" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#1B1F2A] border-[#00D1FF]/30">
                              <SelectItem value="telegram" className="text-white hover:bg-[#00D1FF]/10">
                                Telegram
                              </SelectItem>
                              <SelectItem value="email" className="text-white hover:bg-[#00D1FF]/10">
                                Почта
                              </SelectItem>
                              <SelectItem value="phone" className="text-white hover:bg-[#00D1FF]/10">
                                Телефон
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Conditional Contact Fields */}
                        <AnimatePresence mode="wait">
                          {contactMethod === "telegram" && (
                            <motion.div
                              key="telegram"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="space-y-2"
                            >
                              <Label htmlFor="telegram" className="text-gray-300">
                                Никнейм
                              </Label>
                              <Input
                                id="telegram"
                                type="text"
                                required
                                placeholder="@username"
                                value={formData.telegram}
                                onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
                                className="bg-[#0C0C0C] border-[#00D1FF]/30 text-white focus:border-[#00D1FF] focus:ring-[#00D1FF]/20"
                              />
                            </motion.div>
                          )}

                          {contactMethod === "email" && (
                            <motion.div
                              key="email"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="space-y-2"
                            >
                              <Label htmlFor="email" className="text-gray-300">
                                Email
                              </Label>
                              <Input
                                id="email"
                                type="email"
                                required
                                placeholder="your@email.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="bg-[#0C0C0C] border-[#00D1FF]/30 text-white focus:border-[#00D1FF] focus:ring-[#00D1FF]/20"
                              />
                            </motion.div>
                          )}

                          {contactMethod === "phone" && (
                            <motion.div
                              key="phone"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="space-y-2"
                            >
                              <Label htmlFor="phone" className="text-gray-300">
                                Номер телефона
                              </Label>
                              <Input
                                id="phone"
                                type="tel"
                                required
                                placeholder="+7 (999) 123-45-67"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="bg-[#0C0C0C] border-[#00D1FF]/30 text-white focus:border-[#00D1FF] focus:ring-[#00D1FF]/20"
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Error Message */}
                        {submitError && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-400 text-sm"
                          >
                            {submitError}
                          </motion.div>
                        )}

                        {/* Submit Button */}
                        <Button
                          type="submit"
                          size="lg"
                          disabled={!contactMethod || isSubmitting}
                          className="w-full bg-gradient-to-r from-[#00D1FF] to-[#0099CC] hover:from-[#A7F5FF] hover:to-[#00D1FF] text-black transition-all duration-300 shadow-[0_0_20px_rgba(0,209,255,0.3)] hover:shadow-[0_0_30px_rgba(0,209,255,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? "Отправляем..." : "Отправить"}
                        </Button>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
