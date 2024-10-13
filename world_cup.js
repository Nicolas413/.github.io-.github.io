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
        [0.33, 'rgb(247, 202, 202)'],  // Color para 1 vez
        [0.66, 'rgb(210, 172, 185)'],  // Color para 2 veces
        [1, 'rgb(169, 145, 167)'],   // Color para 3 veces o más
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

// Opciones del layout del mapa
const layout = {
    title: {
        text: '<b>Número de Veces que un País ha sido Anfitrión<br> de un Mundial de Fútbol</b>',
        font: {
            family: 'Helvetica, sans-serif',  // Definir la fuente Helvetica
            size: 24  // Tamaño de la fuente
        }
    },
    geo: {
        projection: {
            type: 'robinson',
        },
        showcoastlines: false,  // Desactivar las líneas costeras
        showland: true,         // Mostrar la tierra
        landcolor: '#e6e6e6',   // Definir el color de la tierra (gris claro en este caso)
        border: false,
        showcountries: false,    // Mostrar las fronteras de los países
        lataxis: {
            range: [-60, 90],
            showgrid: false,   // Desactivar el grid de latitud
        },
        lonaxis: {
            showgrid: false,   // Desactivar el grid de longitud
        },
        bgcolor: 'rgba(0,0,0,0)',  // Hacer transparente el fondo del mapa
        showframe: false 
    },
    dragmode: false,
    annotations: [
        {
            x: 0.26,  // Posición relativa en el eje X (izquierda a derecha)
            y: 0.55,  // Posición relativa en el eje Y (de abajo hacia arriba)
            xref: 'paper',
            yref: 'paper',
            text: 'México será el primer país en ser anfitrión <br> de <span style="color:red;">3 Mundiales de Fútbol</span> el <span style="color:blue;">2026</span>',
            showarrow: true,
            arrowhead: 2,
            ax: -140,    // Desplazamiento en píxeles (dirección horizontal de la flecha)
            ay: 40,     // Desplazamiento en píxeles (dirección vertical de la flecha)
            font: {
                family: 'Helvetica, sans-serif',
                size: 12,
                color: '#000'
            },
        },
        {
            x: 0.3,   // Ajusta la posición relativa para Canadá
            y: 0.8,
            xref: 'paper',
            yref: 'paper',
            text: 'Canadá será anfitrión de su <br><span style="color:red;"> Primer Mundial de Fútbol</span> el <span style="color:blue;">2026</span>',
            showarrow: true,
            arrowhead: 2,
            ax: -100,   // Desplazamiento de la flecha
            ay: -60,
            font: {
                family: 'Helvetica, sans-serif',
                size: 12,
                color: '#000'
            },
        },
        {
            x: 0,   // Ajusta la posición relativa para Canadá
            y: 0 ,
            xref: 'paper',
            yref: 'paper',
            text: '¿Sabías que el Mundial de 2026<br> será el primero en la historia en ser organizado por tres países?<br> Estos son: <b>Canadá, México y Estados Unidos</b>.',
            showarrow: false,
            arrowhead: 2,
            ax: -130,   // Desplazamiento de la flecha
            ay: -80,
            font: {
                family: 'Helvetica, sans-serif',
                size: 12,
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
    hover:false
};

// Renderizar el mapa
Plotly.newPlot('map', data, layout, config);
