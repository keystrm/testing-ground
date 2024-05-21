document.addEventListener('DOMContentLoaded', () => {
    const parcels = [
        {
            id: 'f432b54f-0228-4afb-8868-f40a19d3ce9f',
            details: 'Parcel Details 1',
            extraFields: ['Color', 'Size'],
            documents: ['Invoice', 'Receipt']
        },
        {
            id: '3cb1246e-6a43-49de-8e7a-dd2292078a84',
            details: 'Parcel Details 2',
            extraFields: ['Weight', 'Dimensions'],
            documents: ['Invoice']
        },
        // Add more parcels as needed
    ];

    const parcelAccordion = document.getElementById('parcelAccordion');
    const selectAllButton = document.getElementById('selectAll');
    const deselectAllButton = document.getElementById('deselectAll');
    const exportButton = document.getElementById('exportButton');

    function renderParcels() {
        parcelAccordion.innerHTML = '';
        parcels.forEach(parcel => {
            const parcelElement = document.createElement('div');
            parcelElement.className = 'parcel';
            parcelElement.innerHTML = `
                <div class="parcel-header" data-id="${parcel.id}">
                    <span>Parcel ID: ${parcel.id}</span>
                    <button class="toggle-button">▼</button>
                </div>
                <div class="parcel-body">
                    <div class="tabs">
                        <button class="tab-button active" data-tab="details-${parcel.id}">Details</button>
                        <button class="tab-button" data-tab="extraFields-${parcel.id}">Extra Fields</button>
                        <button class="tab-button" data-tab="documents-${parcel.id}">Documents</button>
                    </div>
                    <div class="tab-content active" id="details-${parcel.id}">
                        <h3>Parcel Details</h3>
                        <p>${parcel.details}</p>
                    </div>
                    <div class="tab-content" id="extraFields-${parcel.id}">
                        <h3>Extra Fields</h3>
                        ${parcel.extraFields.map(field => `
                            <label><input type="checkbox" checked> ${field}</label>
                        `).join('')}
                    </div>
                    <div class="tab-content" id="documents-${parcel.id}">
                        <h3>Documents</h3>
                        ${parcel.documents.map(doc => `
                            <label><input type="checkbox" checked> ${doc}</label>
                        `).join('')}
                    </div>
                </div>
            `;
            parcelAccordion.appendChild(parcelElement);
        });

        attachEventListeners();
    }

    function attachEventListeners() {
        document.querySelectorAll('.parcel-header').forEach(header => {
            header.addEventListener('click', () => {
                const body = header.nextElementSibling;
                body.classList.toggle('active');
                const button = header.querySelector('.toggle-button');
                button.textContent = body.classList.contains('active') ? '▲' : '▼';
            });
        });

        document.querySelectorAll('.tab-button').forEach(button => {
            button.addEventListener('click', () => {
                const parcelId = button.dataset.tab.split('-')[1];
                document.querySelectorAll(`.tab-button[data-tab^="details-${parcelId}"], .tab-button[data-tab^="extraFields-${parcelId}"], .tab-button[data-tab^="documents-${parcelId}"]`).forEach(btn => btn.classList.remove('active'));
                document.querySelectorAll(`.tab-content[id^="details-${parcelId}"], .tab-content[id^="extraFields-${parcelId}"], .tab-content[id^="documents-${parcelId}"]`).forEach(content => content.classList.remove('active'));
                button.classList.add('active');
                document.getElementById(button.dataset.tab).classList.add('active');
            });
        });
    }

    selectAllButton.addEventListener('click', () => {
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = true;
        });
    });

    deselectAllButton.addEventListener('click', () => {
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });
    });

    exportButton.addEventListener('click', () => {
        const selectedData = parcels.map(parcel => ({
            id: parcel.id,
            details: parcel.details,
            extraFields: parcel.extraFields.filter((_, index) => document.querySelector(`#extraFields-${parcel.id} input[type="checkbox"]:nth-child(${index + 1})`).checked),
            documents: parcel.documents.filter((_, index) => document.querySelector(`#documents-${parcel.id} input[type="checkbox"]:nth-child(${index + 1})`).checked)
        }));

        console.log('Exporting:', selectedData);
        alert('Export initiated!');
    });

    renderParcels();
});
