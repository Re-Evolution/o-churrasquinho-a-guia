import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import Header from "../components/Header";
import Footer from "../components/Footer";

function PrivacyContent() {
  const t = useTranslations("privacy");

  return (
    <>
      <Header />
      <main className="pt-28 pb-20 bg-brand-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-brand-black mb-4">
            {t("title")}
          </h1>
          <p className="text-sm text-brand-black/50 mb-10">{t("lastUpdated")}</p>

          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-lg prose prose-lg max-w-none text-brand-black/80">
            <h2 className="text-xl font-bold text-brand-black">
              1. Responsável pelo Tratamento de Dados
            </h2>
            <p>
              O Churrasquinho À Guia, com sede em Av. de Portugal, Lote 6 - Loja
              4, 2790-129 Carnaxide, Portugal, é o responsável pelo tratamento
              dos seus dados pessoais recolhidos através deste website.
            </p>

            <h2 className="text-xl font-bold text-brand-black">
              2. Dados Pessoais Recolhidos
            </h2>
            <p>Recolhemos os seguintes dados pessoais quando utiliza o nosso formulário de reserva:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Nome completo</li>
              <li>Endereço de email</li>
              <li>Número de telefone/telemóvel</li>
              <li>Data e hora da reserva pretendida</li>
              <li>Número de pessoas</li>
              <li>Observações adicionais (opcional)</li>
            </ul>

            <h2 className="text-xl font-bold text-brand-black">
              3. Finalidade do Tratamento
            </h2>
            <p>Os seus dados pessoais são tratados com as seguintes finalidades:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Processar e confirmar reservas de mesa</li>
              <li>Contactar para confirmação ou alteração de reservas</li>
              <li>Melhorar a qualidade do nosso serviço</li>
            </ul>

            <h2 className="text-xl font-bold text-brand-black">
              4. Base Legal
            </h2>
            <p>
              O tratamento dos seus dados é baseado no consentimento que nos
              fornece ao submeter o formulário de reserva, em conformidade com
              o Regulamento Geral sobre a Proteção de Dados (RGPD).
            </p>

            <h2 className="text-xl font-bold text-brand-black">
              5. Período de Conservação
            </h2>
            <p>
              Os dados pessoais são conservados pelo período necessário para a
              finalidade para a qual foram recolhidos, nomeadamente até à
              conclusão da reserva, podendo ser mantidos por um período máximo
              de 12 meses para fins estatísticos internos.
            </p>

            <h2 className="text-xl font-bold text-brand-black">
              6. Direitos do Titular dos Dados
            </h2>
            <p>Nos termos do RGPD, tem os seguintes direitos:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Direito de acesso aos seus dados pessoais</li>
              <li>Direito de retificação de dados incorretos</li>
              <li>Direito ao apagamento dos dados (&ldquo;direito a ser esquecido&rdquo;)</li>
              <li>Direito à portabilidade dos dados</li>
              <li>Direito de oposição ao tratamento</li>
              <li>Direito de retirar o consentimento a qualquer momento</li>
            </ul>
            <p>
              Para exercer qualquer destes direitos, contacte-nos através do
              email: ochurrasquinhoaguia@gmail.com
            </p>

            <h2 className="text-xl font-bold text-brand-black">
              7. Cookies
            </h2>
            <p>
              Este website utiliza apenas cookies estritamente necessários ao
              seu funcionamento. Não utilizamos cookies de rastreamento ou
              publicidade.
            </p>

            <h2 className="text-xl font-bold text-brand-black">
              8. Contacto
            </h2>
            <p>
              Para questões relacionadas com a proteção de dados, contacte-nos
              através de:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Email: ochurrasquinhoaguia@gmail.com</li>
              <li>Telefone: +351 214 173 513</li>
              <li>
                Morada: Av. de Portugal, Lote 6 - Loja 4, 2790-129 Carnaxide
              </li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default async function PrivacidadePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PrivacyContent />;
}
