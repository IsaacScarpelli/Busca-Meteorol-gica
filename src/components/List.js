import React, { useState } from 'react';

// Importando as imagens
import nuvemImage from '../imagem/nuvem.png';
import chuvaImage from '../imagem/chuva.png';
import solImage from '../imagem/sol.png';

function List() {
    const [cidade, setCidade] = useState('');
    const [clima, setClima] = useState(null);
    const [humidade, setHumidade] = useState(null);
    const [vento, setVento] = useState(null);
    const [imagem, setImagem] = useState(null);

    // Função para buscar as informações climáticas
    const fazerBusca = async () => {
        if (!cidade) return alert("Por favor, insira uma cidade.");

        const apiKey = '1b30bbfd2cf80b4555d846795a127a3d';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            setClima(data.main.temp);
            setHumidade(data.main.humidity);
            setVento(data.wind.speed * 1.6); // Convertendo para km/h

            // Definindo a imagem com base nas condições climáticas
            if (data.weather[0].main === "Clouds") {
                setImagem(nuvemImage); // Usando a imagem importada
            } else if (data.weather[0].main === "Rain") {
                setImagem(chuvaImage); // Usando a imagem importada
            } else {
                setImagem(solImage); // Usando a imagem importada
            }
        } catch (err) {
            alert("Erro ao buscar dados: " + err);
        }
    };

    // Função para lidar com o pressionamento de Enter
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            fazerBusca(); // Chama a função de busca quando Enter é pressionado
        }
    };

    return (
        <div id="conteiner">
            <header>
                <h1>Busca Meteorológica</h1>
            </header>
            <div id="busca">
                <h3>Insira o nome da cidade ↴</h3>
                <input
                    type="text"
                    id="cidade-input"
                    placeholder="cidade..."
                    value={cidade}
                    onChange={(e) => setCidade(e.target.value)} // Atualiza o estado da cidade
                    onKeyDown={handleKeyPress} // Lida com o evento de pressionar a tecla
                />
                <button
                    id="busca-btn"
                    onClick={fazerBusca} // Chama a função de busca ao clicar
                >
                    Fazer busca
                </button>
                
            </div>
            <div id="informacoes">
                <h3 id="info-title">Informações climáticas da cidade:</h3>
                <div id="dados-principais">
                    <h4 id="info-cidade">{cidade}</h4>
                    <img id="info-imagem" src={imagem} alt="" />
                    <p id="info-clima">{clima !== null ? `${Math.trunc(clima)}°` : ''}</p>
                </div>
                <div id="dados-extras">
                    <h5 id="info-humidade">{humidade !== null ? `Humidade: ${Math.trunc(humidade)}%` : ''}</h5><br />
                    <h5 id="info-vento">{vento !== null ? `Vento: ${Math.trunc(vento)} km/h` : ''}</h5>
                </div>  
            </div>
            <a href="https://api.whatsapp.com/send?phone=+553197234480&text=teste" target="_blank">Estamos no WhatsApp</a>
        </div>
    );
}

export default List;
