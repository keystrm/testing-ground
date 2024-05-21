document.addEventListener('DOMContentLoaded', () => {
    const parcels = [
        { id: 1, sender: 'Alice', receiver: 'Bob', status: 'Delivered', documents: ['Invoice', 'Receipt'], extraFields: ['Weight', 'Dimensions'] },
        { id: 2, sender: 'Charlie', receiver: 'Dave', status: 'In Transit', documents: ['Invoice'], extraFields: ['Weight'] },
        // Add more parcels as needed
    ];

    const itemsPerPage = 1;
    let currentPage = 1;
    let selectedParcel = null;

    const parcelTableBody = document.getElementById('parcel-table-body');
    const pageIndicator = document.getElementById('pageIndicator');
    const exportModal = document.getElementById('exportModal');
    const exportForm = document.getElementById('exportForm');

    function renderParcelList() {
        parcelTableBody.innerHTML = '';
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedParcels = parcels.slice(start, end);

        paginatedParcels.forEach(parcel => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${parcel.id}</td>
                <td>${parcel.sender}</td>
                <td>${parcel.receiver}</td>
                <td>${parcel.status}</td>
            `;
            row.addEventListener('click', () => showParcelDetails(parcel));
            parcelTableBody.appendChild(row);
        });

        pageIndicator.textContent = `Page ${currentPage}`;
    }

    function showParcelDetails(parcel) {
        selectedParcel = parcel;
        document.getElementById('parcel-overview').textContent = `Parcel ID: ${parcel.id}\nSender: ${parcel.sender}\nReceiver: ${parcel.receiver}\nStatus: ${parcel.status}`;

        const documentList = document.getElementById('document-list');
        documentList.innerHTML = '';
        parcel.documents.forEach(doc => {
            const item = document.createElement('li');
            item.innerHTML = `<label><input type="checkbox" value="${doc}"> ${doc}</label>`;
            documentList.appendChild(item);
        });

        const extraFieldList = document.getElementById('extra-field-list');
        extraFieldList.innerHTML = '';
        parcel.extraFields.forEach(field => {
            const item = document.createElement('li');
            item.innerHTML = `<label><input type="checkbox" value="${field}"> ${field}</label>`;
            extraFieldList.appendChild(item);
        });
    }

    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            document.querySelectorAll('.tab-content').forEach(content => content.style.display = 'none');
            document.getElementById(button.dataset.tab).style.display = 'block';
        });
    });

    document.getElementById('prevPage').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderParcelList();
        }
    });

    document.getElementById('nextPage').addEventListener('click', () => {
        if (currentPage < Math.ceil(parcels.length / itemsPerPage)) {
            currentPage++;
            renderParcelList();
        }
    });

    document.getElementById('exportButton').addEventListener('click', () => {
        if (!selectedParcel) return;

        document.getElementById('export-documents-list').innerHTML = '';
        selectedParcel.documents.forEach(doc => {
            const item = document.createElement('div');
            item.innerHTML = `<label><input type="checkbox" name="documents" value="${doc}" checked> ${doc}</label>`;
            document.getElementById('export-documents-list').appendChild(item);
        });

        document.getElementById('export-extra-fields-list').innerHTML = '';
        selectedParcel.extraFields.forEach(field => {
            const item = document.createElement('div');
            item.innerHTML = `<label><input type="checkbox" name="extraFields" value="${field}" checked> ${field}</label>`;
            document.getElementById('export-extra-fields-list').appendChild(item);
        });

        exportModal.style.display = 'flex';
    });

    document.querySelector('.close').addEventListener('click', () => {
        exportModal.style.display = 'none';
    });

    exportForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const selectedDocs = Array.from(exportForm.elements.documents).filter(el => el.checked).map(el => el.value);
        const selectedFields = Array.from(exportForm.elements.extraFields).filter(el => el.checked).map(el => el.value);
        console.log('Exporting:', { documents: selectedDocs, extraFields: selectedFields });
        exportModal.style.display = 'none';
    });

    renderParcelList();
});
