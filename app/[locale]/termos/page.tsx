import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import Header from "../components/Header";
import Footer from "../components/Footer";

function TermsContent() {
  const t = useTranslations("terms");

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
              1. Informações Gerais
            </h2>
            <p>
              Este website é propriedade e operado por O Churrasquinho À Guia,
              estabelecimento de restauração localizado em Av. de Portugal, Lote
              6 - Loja 4, 2790-129 Carnaxide, Portugal. Ao utilizar este
              website, concorda com os presentes Termos de Serviço.
            </p>

            <h2 className="text-xl font-bold text-brand-black">
              2. Utilização do Website
            </h2>
            <p>
              Este website destina-se a fornecer informações sobre o nosso
              restaurante, incluindo menu, horários, localização e a
              possibilidade de efetuar reservas online. A utilização deste
              website deve ser feita de forma lícita e de acordo com estes
              termos.
            </p>

            <h2 className="text-xl font-bold text-brand-black">
              3. Reservas Online
            </h2>
            <p>
              As reservas efetuadas através do formulário online ficam sujeitas
              a confirmação por parte do restaurante. Uma reserva só é
              considerada confirmada após receção de confirmação por telefone,
              WhatsApp ou email.
            </p>
            <p>
              Reservamo-nos o direito de cancelar reservas não confirmadas ou
              em caso de informações incorretas fornecidas pelo utilizador.
            </p>

            <h2 className="text-xl font-bold text-brand-black">
              4. Propriedade Intelectual
            </h2>
            <p>
              Todo o conteúdo deste website, incluindo textos, imagens,
              logótipos e design, é propriedade de O Churrasquinho À Guia e
              está protegido por direitos de autor. É proibida a reprodução,
              distribuição ou utilização não autorizada deste conteúdo.
            </p>

            <h2 className="text-xl font-bold text-brand-black">
              5. Preços e Menu
            </h2>
            <p>
              Os preços e itens do menu apresentados neste website são
              indicativos e podem sofrer alterações sem aviso prévio. Os preços
              praticados no restaurante prevalecem sobre os publicados online.
            </p>

            <h2 className="text-xl font-bold text-brand-black">
              6. Limitação de Responsabilidade
            </h2>
            <p>
              Embora façamos todos os esforços para manter as informações
              atualizadas e corretas, não garantimos a exatidão completa de
              todos os conteúdos. O Churrasquinho À Guia não se responsabiliza
              por eventuais erros ou omissões nas informações apresentadas.
            </p>

            <h2 className="text-xl font-bold text-brand-black">
              7. Links Externos
            </h2>
            <p>
              Este website pode conter links para sites externos (Google Maps,
              redes sociais, etc). Não nos responsabilizamos pelo conteúdo ou
              práticas de privacidade desses sites.
            </p>

            <h2 className="text-xl font-bold text-brand-black">
              8. Alterações aos Termos
            </h2>
            <p>
              Reservamo-nos o direito de alterar estes Termos de Serviço a
              qualquer momento. As alterações entram em vigor imediatamente
              após a sua publicação neste website.
            </p>

            <h2 className="text-xl font-bold text-brand-black">
              9. Lei Aplicável
            </h2>
            <p>
              Estes Termos de Serviço são regidos pela legislação portuguesa.
              Qualquer litígio será submetido à jurisdição dos tribunais
              portugueses competentes.
            </p>

            <h2 className="text-xl font-bold text-brand-black">
              10. Contacto
            </h2>
            <p>
              Para questões sobre estes Termos de Serviço, contacte-nos:
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

export default async function TermosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <TermsContent />;
}
