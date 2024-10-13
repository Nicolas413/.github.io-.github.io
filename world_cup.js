// Obtener la lista de países y contar las veces que han sido anfitriones
const countryCounts = {};

// Recorrer los datos del mundial y contar cuántas veces cada país ha sido sede
Object.keys(worldCupData).forEach(year => {
    worldCupData[year].forEach(country => {
        if (countryCounts[country]) {
            countryCounts[country] += 1;
        } else {
            countryCounts[country] = 1;
        }
    });
});

// Extraer los países únicos
const countries = Object.keys(countryCounts);

// Extraer el conteo correspondiente a cada país
const counts = countries.map(country => countryCounts[country]);

// Configuración del mapa
const data = [{
    type: 'choropleth',
    locationmode: 'country names',
    locations: countries,
    z: counts,  // Usamos el conteo de veces como valor para el color
    text: countries,
    colorscale: [
        [0, 'rgba(255, 255, 255, 0.1)'], // Color para 0 veces (no sede)
        [0.33, '#f7e55e'],  // Color para 1 vez
        [0.66, '#ffae42'],  // Color para 2 veces
        [1, '#6a3d9a'],   // Color para 3 veces o más
    ],
    zmin: 0,
    zmax: 3,
    autocolorscale: false,  // Desactivamos el autoescalado de colores
    showscale: false,        // Mostrar la escala de colores
    hoverinfo: 'none', // Mostrar país y cantidad en hover
    hover: false,
    colorbar: {
        titleside: 'right',
        ticksuffix: ' veces',
        tickmode: 'array',
        tickvals: [0, 1, 2, 3],
        ticktext: ['0', '1', '2', '3'],
        len: 0.5,  // Longitud de la barra de colores
    }
}];

// Ajuste de las flechas

// Obtener el tamaño del gráfico
const getGraphSize = () => {
    const width = document.getElementById('map').clientWidth; // Ancho del contenedor del gráfico
    const height = document.getElementById('map').clientHeight; // Altura del contenedor del gráfico
    return { width, height };
};

// Calcular el tamaño de la flecha y la cabeza de la flecha
const calculateArrowProperties = () => {
    const { width, height } = getGraphSize();
    const sizeFactor = Math.min(width, height) / 100; // Factor basado en el tamaño del gráfico
    return {
        arrowsize: Math.max(1), // Tamaño mínimo de la flecha
        arrowhead: Math.max(0.5) // Tamaño mínimo de la cabeza de flecha
    };
};

// Obtener las propiedades de la flecha
const { arrowsize, arrowhead } = calculateArrowProperties();

// Opciones del layout del mapa
const layout = {
    title: {
        text: '<b style="font-size: 2vw;">Número de Veces que un País ha sido Anfitrión<br> de un Mundial de Fútbol</b>', // Usamos vw para hacer el título responsivo
        font: {
            family: 'Helvetica, sans-serif'
        }
    },
    geo: {
        projection: {
            type: 'robinson',
        },
        showcoastlines: false,
        showland: true,
        landcolor: '#e6e6e6',
        border: false,
        showcountries: false,
        lataxis: {
            range: [-60, 90],
            showgrid: false,
        },
        lonaxis: {
            showgrid: false,
        },
        bgcolor: 'rgba(0,0,0,0)',
        showframe: false
    },
    dragmode: false,
    annotations: [
        {
            x: 0.25,  // Posición relativa (25% en el eje X)
            y: 0.55,  // Posición relativa (55% en el eje Y)
            xref: 'paper',
            yref: 'paper',
            text: '<span style="font-size: 1vw;">México será el primer país en ser anfitrión de <br><em style="color:blue;">3 Mundiales de Fútbol</em> en el <em style="color:blue;">2026</em></span>', // Usamos span y em para estilos de color
            showarrow: true,
            arrowhead: arrowhead,
            ax: 0.1,    // Flecha movida al 15% del ancho del gráfico
            ay: 0.48,  // Posición de la flecha
            axref: 'paper', // Usamos píxeles para referencia
            ayref: 'paper', // Usamos píxeles para referencia
            font: {
                family: 'Helvetica, sans-serif',
                size: 0,  // Usamos HTML para controlar el tamaño del texto
                color: '#000'
            },
            arrowcolor: 'black', // Cambia el color de la flecha
            arrowsize: arrowsize, // Tamaño de la flecha (ajusta según el tamaño de la ventana)
        },
        {
            x: 0.25,   // Ajusta la posición relativa para Canadá
            y: 0.8,
            xref: 'paper',
            yref: 'paper',
            text: '<span style="font-size: 1vw;">Canadá será anfitrión de su <br><em style="color:blue;">primer Mundial de Fútbol</em> en el <em style="color:blue;">2026</em></span>', // Cambio de color con etiquetas HTML
            showarrow: true,
            arrowhead: arrowhead,
            ax: 0.1,   // Flecha relativa en porcentaje
            ay: 0.95,   // Posición de la flecha
            axref: 'paper', // Usamos píxeles para referencia
            ayref: 'paper', // Usamos píxeles para referencia
            font: {
                family: 'Helvetica, sans-serif',
                size: 0,  // Usamos HTML para controlar el tamaño del texto
                color: '#000'
            },
            arrowcolor: 'black', // Cambia el color de la flecha
            arrowsize: arrowsize, // Tamaño de la flecha (ajusta según el tamaño de la ventana)
        },
        {
            x: 0,   // Ajusta la posición relativa para el tercer texto
            y: 0,
            xref: 'paper',
            yref: 'paper',
            text: '<span style="font-size: 1vw;">¿Sabías que el Mundial de 2026<br> será el primero en la historia en ser organizado por tres países?<br> Estos son: <em style="color:#000000;">Canadá, México y Estados Unidos</em>.</span>',  // Responsivo con colores HTML
            showarrow: false,
            font: {
                family: 'Helvetica, sans-serif',
                size: 0,  // Usamos HTML para controlar el tamaño del texto
                color: '#000'
            },
        }
    ]
};




// Configuración para desactivar el zoom y el arrastre, pero mantener hover
const config = {
    scrollZoom: false,       // Desactivar el zoom por scroll
    displayModeBar: false,   // Ocultar la barra de herramientas de Plotly
    doubleClick: false,       // Desactivar el doble clic para zoom
    hover:false,
    responsive: true
};

// Renderizar el mapa
Plotly.newPlot('map', data, layout, config);
