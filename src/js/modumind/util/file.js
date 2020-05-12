const file = {
  read(fileData, fnCallback) {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof fnCallback === 'function') {
        fnCallback(reader.result, fileData.name);
      }
    };
    reader.readAsText(fileData);
  },

  save(fileData, type, filename) {
    let blob;
    if (typeof window.Blob === 'function') {
      blob = new Blob([fileData], { type });
    } else {
      const BlobBuilder = (
        window.BlobBuilder
        || window.MozBlobBuilder
        || window.WebKitBlobBuilder
        || window.MSBlobBuilder
      );
      const bb = new BlobBuilder();
      bb.append(fileData);
      blob = bb.getBlob(type);
    }
    if (navigator.msSaveBlob) {
      navigator.msSaveBlob(blob, filename);
    } else {
      const URL = window.URL || window.webkitURL;
      const bloburl = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      if ('download' in anchor) {
        anchor.style.visibility = 'hidden';
        anchor.href = bloburl;
        anchor.download = `${filename}.${type}`;
        document.body.appendChild(anchor);
        const evt = document.createEvent('MouseEvents');
        evt.initEvent('click', true, true);
        anchor.dispatchEvent(evt);
        document.body.removeChild(anchor);
      } else {
        window.location.href = bloburl;
      }
    }
  },
};

export default file;
