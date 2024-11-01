import React, { useEffect, useState } from "react";
import "../styles/home.css"
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProdutosV from "../components/ProdutoV";
import banner1 from "../assets/banners/banner_1.png";
import banner2 from "../assets/banners/banner_2.png";
import banner3 from "../assets/banners/banner_3.png";
import banner4 from "../assets/banners/banner_4.png";
import banner5 from "../assets/banners/banner_5.png";
import banner6 from "../assets/banners/banner_6.png";
import imageHome from "../assets/image_pages/image(home).png"
import { IoIosArrowForward, IoIosArrowBack  } from "react-icons/io";
import Integralmedica_creatina from "../assets/produtos/creatina/Integralmedica.png"
import Max_creatina from "../assets/produtos/creatina/Max.png"
import Probiotica_creatina from "../assets/produtos/creatina/Probiotica.png"
import Max_barra_proteina from "../assets/produtos/barra_proteina/Max.png"
import YoPRO_barra_proteina from "../assets/produtos/barra_proteina/YoPro.png"
import BOLD_barra_proteina from "../assets/produtos/barra_proteina/BOLD.png"
import Max_whey from "../assets/produtos/whey_protein/Max.png"
import DiaboVerde_whey from "../assets/produtos/whey_protein/DiaboVerde.png"

export default function Home() {

      const [modalVisible, setModalVisible] = useState(false);
      const [mostrarSenha, setMostrarSenha] = useState(false);
      
      const openModal = () => setModalVisible(true);
      const closeModal = () => setModalVisible(false);
      
      useEffect(() => {
         if (modalVisible) {
            document.body.classList.add('no-scroll');
         } else {
            document.body.classList.remove('no-scroll');
         }
         
         return () => document.body.classList.remove('no-scroll');
      }, [modalVisible]);
      


      const [Imagens, setImages] = useState(0);
      // Lista de URLs de imagens para o carrossel
      const image = [
        banner1,
        banner2,
        banner3,
        banner4,
        banner5,
        banner6,
      ];
    
      const Next = () => {
         setImages((prevIndex) => (prevIndex + 1) % image.length);
      };
    
      const Prev = () => {
         setImages((prevIndex) =>
          prevIndex === 0 ? image.length - 1 : prevIndex - 1
        );
      };

       // UseEffect para mudar a imagem automaticamente a cada 5 segundos
      useEffect(() => {
         const interval = setInterval(Next, 5000); // 5000ms = 5 segundos

      // Limpar o intervalo quando o componente for desmontado
         return () => clearInterval(interval);
      }, [Imagens]); // Depende do currentIndex para mudar a cada atualização



      const [Expandido, setExpandido] = useState(false);

      // Função para alternar o estado entre expandido e contraído
      const Expandir = () => {
         setExpandido(!Expandido);
      };

   return (
      <div className="home_container">
         <Header openModal={openModal} />
         <div className="div_banner_principal">
            <div className="banner_principal">
               <img src={image[Imagens]}/>
            </div>
            <div className="banner_principal_botao">
               <button onClick={Prev} className="botao_banner">
               <IoIosArrowBack className="arrows_botao"/>
               </button>
               <button onClick={Next} className="botao_banner">
               <IoIosArrowForward className="arrows_botao"/>
               </button>
            </div>
         </div>
         <div className="div_title_maisVendido">
            <div className="title_maisVendido">
               <text>Mais vendidos</text>
            </div>
         </div>
         <div className="div_produtos_maisVendido">
            <div className="produtos_maisVendido">
               <div>
                  <ProdutosV
                  image={Integralmedica_creatina} 
                  name="Creatina Hardcore"
                  price="110,99"
                  discount="6"
                  />
                  <ProdutosV
                  image={YoPRO_barra_proteina} 
                  name="YoPRO: Barra de Proteínas Nutrata Chocolate 15g"
                  price="11,67"
                  discount="2"
                  />
               </div>
               <div>
                  <ProdutosV
                  image={Max_barra_proteina} 
                  name="Top Whey Bar"
                  price="10,89"
                  discount="2"
                  />
                  <ProdutosV
                  image={Max_whey} 
                  name="Whey PRO (1kg) Max Titanium"
                  price="68,00"
                  discount="5"
                  />
               </div>
               <div>
                  <ProdutosV
                  image={Probiotica_creatina} 
                  name="Creatina Pura (300g) - Probiótica"
                  price="110,99"
                  discount="6"
                  />
                  <ProdutosV
                  image={DiaboVerde_whey} 
                  name="Blend Protein Diabo Verde (900g) FTW"
                  price="72,00"
                  discount="4"
                  />
               </div>
               <div>
                  <ProdutosV
                  image={BOLD_barra_proteina} 
                  name="La Fajor leitinho (50g) La Ganexa"
                  price="8,91"
                  discount="2"
                  />
                  <ProdutosV
                  image={Max_creatina} 
                  name="Horus (300g) Max Titanium"
                  price="113,17"
                  discount="12"
                  />
               </div>
            </div>
         </div>
         <img className="image_home" src={imageHome}></img>
         <div className="div_explicacao">
            <div className="explicacao">
               <h1>Para que servem os suplementos alimentares?</h1>
               <div>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Suplementos alimentares são a melhor forma que você tem de repor nutrientes ou adicioná-los à sua dieta, principalmente se você pratica atividades físicas, o que aumenta a demanda do seu corpo. São usados para diferentes finalidades com o intuito de dar ao seu corpo esse extra, independente se seu objetivo é ganhar massa magra, perder gordura, melhorar seu desempenho e condicionamento ou saúde e bem-estar.</p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Algumas pessoas tem uma ideia errônea que suplementos são somente para atletas, porém, eles servem para suprir qualquer defasagem de nutrientes e alimentação que você possa ter. Não suprir a necessidade diária desses nutrientes, sejam eles proteínas, carboidratos, gorduras, vitaminas ou minerais, pode causar sérios danos a sua saúde.</p>
               </div>
               <div className={`content ${Expandido ? 'expandido' : 'collapsed'}`}>
                  <p className="text_expandido">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;As pessoas têm diferentes necessidades durante a vida. Por isso, existem diversos tipos de suplementos para atender a essas demandas. Por exemplo, um composto destinado a idosos pode ser indicado para ajudar na reposição de substâncias perdidas conforme envelhecemos. Existe uma variedade de complementos alimentares no mercado.</p>
                  <h2>Repor Nutrientes Essenciais de Forma Eficiente</h2>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Suplementos alimentares são a melhor forma que você tem de repor nutrientes ou adicioná-los à sua dieta, principalmente se você pratica atividades físicas, o que aumenta a demanda do seu corpo. São usados para diferentes finalidades com o intuito de dar ao seu corpo esse extra, independente se seu objetivo é ganhar massa magra, perder gordura, melhorar seu desempenho e condicionamento ou saúde e bem-estar.</p>
                  <h2>Apoio ao Desempenho Físico e Recuperação</h2>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Suplementos alimentares são a melhor forma que você tem de repor nutrientes ou adicioná-los à sua dieta, principalmente se você pratica atividades físicas, o que aumenta a demanda do seu corpo. São usados para diferentes finalidades com o intuito de dar ao seu corpo esse extra, independente se seu objetivo é ganhar massa magra, perder gordura, melhorar seu desempenho e condicionamento ou saúde e bem-estar.</p>
                  <h2>Ajuda no Ganho de Massa Muscular e Perda de Gordura</h2>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Suplementos alimentares são a melhor forma que você tem de repor nutrientes ou adicioná-los à sua dieta, principalmente se você pratica atividades físicas, o que aumenta a demanda do seu corpo. São usados para diferentes finalidades com o intuito de dar ao seu corpo esse extra, independente se seu objetivo é ganhar massa magra, perder gordura, melhorar seu desempenho e condicionamento ou saúde e bem-estar.</p>
                  <h2>Melhoria do Sistema Imunológico e Saúde Geral</h2>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Suplementos alimentares são a melhor forma que você tem de repor nutrientes ou adicioná-los à sua dieta, principalmente se você pratica atividades físicas, o que aumenta a demanda do seu corpo. São usados para diferentes finalidades com o intuito de dar ao seu corpo esse extra, independente se seu objetivo é ganhar massa magra, perder gordura, melhorar seu desempenho e condicionamento ou saúde e bem-estar.</p>
               </div>

               <button onClick={Expandir} className="botao_expandir">
                  {Expandido ? 'Ver menos' : 'Ver mais'}
               </button>
            </div>
         </div>
         <div className="div_parte_depoimentos">
            <div className="parte_depoimentos">
               <div className="title_depoimentos"><text>NOSSOS DEPOIMENTOS</text></div>
               <div className="div_depoimentos">
                  <div className="depoimentos">
                     <div className="depoimento_individual">
                        <div className="name_avaliacao"><h2>Pedro P.</h2></div>
                        <div className="text_individual"><text>“site fácil de usar, produtos honestos, preços competitivos e entregas sempre no prazo...”</text></div>
                        <div className="avaliacao"><text>★★★★★</text></div>
                     </div>
                     <div className="depoimento_individual">
                        <div className="name_avaliacao"><h2>Octávio</h2></div>
                        <div className="text_individual"><text>“gostei demais do site, me senti seguro na minha compra, amo a bodyfit.”</text></div>
                        <div className="avaliacao"><text>★★★★</text></div>
                     </div>
                     <div className="depoimento_individual">
                        <div className="name_avaliacao"><h2>Matheus</h2></div>
                        <div className="text_individual"><text>“EU AGRADEÇO IMENSAMENTE QUEM CRIO ESSE SITE, EXCELENTE”</text></div>
                        <div className="avaliacao"><text>★★★★★</text></div>
                     </div>
                  </div>
                  <div className="botoes_depoimentos">
                     <button className="botao_depoimento">
                        <IoIosArrowBack className="arrows_botao_dep"/>
                     </button>
                     <button className="botao_depoimento">
                        <IoIosArrowForward className="arrows_botao_dep"/>
                     </button>
                  </div>
               </div>
            </div>
         </div>
         <Footer />
      </div>
   );
}




