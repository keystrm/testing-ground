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

    const itemsPerPage = 2;
    let currentPage = 1;
    const parcelList = document.getElementById('parcelList');
    const selectAllButton = document.getElementById('selectAll');
    const deselectAllButton = document.getElementById('deselectAll');
    const exportButton = document.getElementById('exportButton');
    const prevPageButton = document.getElementById('prevPage');
    const nextPageButton = document.getElementById('nextPage');
    const pageIndicator = document.getElementById('pageIndicator');

    function renderParcels() {
        parcelList.innerHTML = '';
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedParcels = parcels.slice(start, end);

        paginatedParcels.forEach(parcel => {
            const parcelElement = document.createElement('div');
            parcelElement.className = 'parcel';
            parcelElement.innerHTML = `
                <div class="parcel-header">
                    <span>Parcel ID: ${parcel.id}</span>
                    <input type="checkbox" class="parcel-checkbox">
                </div>
                <div class="parcel-body">
                    <div class="section">
                        <h3>Details</h3>
                        <p>${parcel.details}</p>
                    </div>
                    <div class="section">
                        <h3>Extra Fields</h3>
                        ${parcel.extraFields.map(field => `
                            <label><input type="checkbox" class="extra-field-checkbox" data-parcel-id="${parcel.id}"> ${field}</label>
                        `).join('')}
                    </div>
                    <div class="section">
                        <h3>Documents</h3>
                        ${parcel.documents.map(doc => `
                            <label><input type="checkbox" class="document-checkbox" data-parcel-id="${parcel.id}"> ${doc}</label>
                        `).join('')}
                    </div>
                </div>
            `;
            parcelList.appendChild(parcelElement);
        });

        attachEventListeners();
        updatePageIndicator();
    }

    function attachEventListeners() {
        document.querySelectorAll('.parcel-header').forEach(header => {
            header.addEventListener('click', () => {
                const body = header.nextElementSibling;
                body.classList.toggle('active');
            });
        });

        document.querySelectorAll('.parcel-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const isChecked = e.target.checked;
                const parcelId = e.target.closest('.parcel').querySelector('.parcel-header').textContent;
                document.querySelectorAll(`input[data-parcel-id="${parcelId}"]`).forEach(childCheckbox => {
                    childCheckbox.checked = isChecked;
                });
            });
        });
    }

    function updatePageIndicator() {
        pageIndicator.textContent = `Page ${currentPage}`;
        prevPageButton.disabled = currentPage === 1;
        nextPageButton.disabled = currentPage === Math.ceil(parcels.length / itemsPerPage);
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
            extraFields: parcel.extraFields.filter((_, index) => document.querySelector(`input[data-parcel-id="${parcel.id}"].extra-field-checkbox:nth-child(${index + 1})`).checked),
            documents: parcel.documents.filter((_, index) => document.querySelector(`input[data-parcel-id="${parcel.id}"].document-checkbox:nth-child(${index + 1})`).checked)
        }));

        console.log('Exporting:', selectedData);
        alert('Export initiated!');
    });

    prevPageButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderParcels();
        }
    });

    nextPageButton.addEventListener('click', () => {
        if (currentPage < Math.ceil(parcels.length / itemsPerPage)) {
            currentPage++;
            renderParcels();
        }
    });

    renderParcels();
});
