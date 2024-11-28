import React, { useEffect, useState } from "react";
import "../styles/home.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProdutosV from "../components/ProdutoV";
import banner1 from "../assets/banners/banner_1.png";
import banner2 from "../assets/banners/banner_2.png";
import banner3 from "../assets/banners/banner_3.png";
import banner4 from "../assets/banners/banner_4.png";
import banner5 from "../assets/banners/banner_5.png";
import banner6 from "../assets/banners/banner_6.png";
import imageHome from "../assets/image_pages/image(home).png";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import api from "../services/api"; // Supondo que você tenha uma API configurada

export default function Home() {
  const [produtos, setProdutos] = useState([]); // Produtos totais
  const [produtosFiltrados, setProdutosFiltrados] = useState([]); // Produtos filtrados
  const [modalVisible, setModalVisible] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [Imagens, setImages] = useState(0);

  // Lista de URLs de imagens para o carrossel
  const image = [banner1, banner2, banner3, banner4, banner5, banner6];

  const Next = () => {
    setImages((prevIndex) => (prevIndex + 1) % image.length);
  };

  const Prev = () => {
    setImages((prevIndex) =>
      prevIndex === 0 ? image.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    // UseEffect para mudar a imagem automaticamente a cada 5 segundos
    const interval = setInterval(Next, 5000); // 5000ms = 5 segundos

    return () => clearInterval(interval);
  }, [Imagens]);

  useEffect(() => {
    // Buscar produtos da API e filtrar os 8 primeiros
    const fetchProdutos = async () => {
      try {
        const response = await api.get("/produtos");
        // Supondo que os produtos venham como um array
        const primeirosProdutos = response.data.slice(0, 8); // Pega os 8 primeiros produtos
        setProdutos(primeirosProdutos); // Atualiza o estado com os produtos
      } catch (error) {
        console.error("Erro ao buscar os produtos", error);
      }
    };

    fetchProdutos();
  }, []);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const [Expandido, setExpandido] = useState(false);
  const Expandir = () => {
    setExpandido(!Expandido);
  };

  return (
    <div className="home_container">
      <Header openModal={openModal} />
      <div className="div_banner_principal">
        <div className="banner_principal">
          <img src={image[Imagens]} />
        </div>
        <div className="banner_principal_botao">
          <button onClick={Prev} className="botao_banner">
            <IoIosArrowBack className="arrows_botao" />
          </button>
          <button onClick={Next} className="botao_banner">
            <IoIosArrowForward className="arrows_botao" />
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
            {/* Mapear os produtos filtrados (os 8 primeiros)
            {produtos.map((produto, index) => (
              <ProdutosV
                key={index}
                image={produto.imagem} // Supondo que cada produto tenha um campo 'imagem'
                name={produto.nome} // Supondo que cada produto tenha um campo 'nome'
                price={produto.preco} // Supondo que cada produto tenha um campo 'preco'
                discount={produto.desconto} // Supondo que cada produto tenha um campo 'desconto'
              />
            ))} */}
          </div>
        </div>
      </div>

      <img className="image_home" src={imageHome}></img>
      <div className="div_explicacao">
        <div className="explicacao">
          <h1>Para que servem os suplementos alimentares?</h1>
          <div>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Os suplementos alimentares são produtos destinados a complementar a alimentação diária, fornecendo nutrientes que podem estar em falta ou em quantidades insuficientes na dieta. Eles têm como objetivo ajudar a garantir que o corpo receba os nutrientes essenciais necessários para seu funcionamento ideal, como vitaminas, minerais, proteínas, aminoácidos, ácidos graxos essenciais e fibras.
            </p>
            <p>
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Esses suplementos podem ser indicados para diferentes finalidades, dependendo das necessidades individuais. Por exemplo, atletas podem utilizar suplementos para melhorar o desempenho físico e acelerar a recuperação muscular, enquanto pessoas com deficiências nutricionais específicas podem fazer uso de vitaminas e minerais para corrigir essas lacunas. Além disso, idosos, gestantes e pessoas com dietas restritivas (como veganas ou vegetarianas) também podem se beneficiar de suplementos para garantir uma nutrição balanceada.
            </p>
          </div>
          <div className={`content ${Expandido ? "expandido" : "collapsed"}`}>
            <p className="text_expandido">
            <p>
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;É importante destacar que, embora os suplementos possam ser úteis em certas situações, eles não devem substituir uma alimentação equilibrada e saudável. A ingestão excessiva de suplementos, sem a orientação de um profissional de saúde, pode gerar efeitos adversos e até prejudicar o organismo. Portanto, é fundamental consultar um médico ou nutricionista antes de iniciar o uso de qualquer suplemento, a fim de garantir que ele seja adequado às necessidades individuais e consumido nas doses corretas.
            </p>
               <div>
               <h2>Repor Nutrientes Essenciais de Forma Eficiente</h2>
               <p>
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Repor nutrientes essenciais de forma eficiente é fundamental para manter o bom funcionamento do organismo e garantir a saúde a longo prazo. Nosso corpo necessita de uma variedade de nutrientes, como vitaminas, minerais, proteínas e ácidos graxos, para desempenhar funções vitais, como a produção de energia, a manutenção da saúde imunológica e a reparação de tecidos. Quando a alimentação não é capaz de suprir todas essas necessidades de maneira adequada, a reposição por meio de suplementos alimentares pode ser uma alternativa eficaz.
               </p>
               <p>
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A eficiência na reposição de nutrientes depende de vários fatores, como a escolha dos suplementos certos, a dosagem correta e a forma de administração. Por exemplo, algumas vitaminas e minerais são melhor absorvidos quando ingeridos com alimentos, enquanto outros, como a vitamina D, podem ser consumidos com ou sem alimentos. Além disso, a escolha de suplementos de alta qualidade, que utilizam formas biodisponíveis de nutrientes, é essencial para garantir que o corpo consiga absorver e utilizar os componentes de forma adequada.
               </p>
               <h2>Suplementos podem substituir a alimentação?</h2>
               <p>
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Os suplementos têm vitaminas e proteínas que fazem bem para o coração, rins, fígado e músculos. Mesmo assim, eles não substituem a alimentação.
               </p>
               <p>
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Os suplementos prontos e já industrializados se apresentam como uma saída segura e bem mais acessível para quem busca equilíbrio e melhora da imunidade corporal. Um suplemento alimentar, por melhor que seja, jamais substituirá uma boa dieta alimentar ou um tratamento médico específico. Afinal, como o próprio nome diz, suplemento é algo que existe para completar, portanto é um complemento alimentar, e nunca um substituto.
               </p>
               <p>
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;“Os suplementos funcionam como um complemento da alimentação. Na maioria dos casos, são indicados para pessoas que apresentam uma carência muito grande de determinado nutriente”, explica a nutricionista Camila Garcia, da equipe do setor de Nutrição Preventiva do Hospital do Coração, de São Paulo. “Mas, em geral, uma alimentação equilibrada já faz esse papel, seja para prática de exercícios ou para o dia a dia.”
               </p>
               </div>
            </p>
          </div>

          <button onClick={Expandir} className="botao_expandir">
            {Expandido ? "Ver menos" : "Ver mais"}
          </button>
        </div>
      </div>

      <div className="div_parte_depoimentos">
        <div className="parte_depoimentos">
          <div className="title_depoimentos">
            <text>NOSSOS DEPOIMENTOS</text>
          </div>
          <div className="div_depoimentos">
            <div className="depoimentos">
              <div className="depoimento_individual">
                <div className="name_avaliacao">
                  <h2>Pedro P.</h2>
                </div>
                <div className="text_individual">
                  <text>“site fácil de usar, produtos honestos, preços competitivos e entregas sempre no prazo...”</text>
                </div>
                <div className="avaliacao">
                  <text>★★★★★</text>
                </div>
              </div>
              <div className="depoimento_individual" id="octavio_depoimento">
                <div className="name_avaliacao">
                  <h2>Octávio</h2>
                </div>
                <div className="text_individual">
                  <text>“gostei demais do site, me senti seguro na minha compra, amo a bodyfit.”</text>
                </div>
                <div className="avaliacao">
                  <text>★★★★</text>
                </div>
              </div>
              <div className="depoimento_individual" id="matheus_depoimento">
                <div className="name_avaliacao">
                  <h2>Matheus</h2>
                </div>
                <div className="text_individual">
                  <text>“EU AGRADEÇO IMENSAMENTE QUEM CRIO ESSE SITE, EXCELENTE”</text>
                </div>
                <div className="avaliacao">
                  <text>★★★★★</text>
                </div>
              </div>
            </div>
            <div className="botoes_depoimentos">
              <button className="botao_depoimento">
                <IoIosArrowBack className="arrows_botao_dep" />
              </button>
              <button className="botao_depoimento">
                <IoIosArrowForward className="arrows_botao_dep" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
