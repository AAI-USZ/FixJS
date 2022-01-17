function closeInfo() {
  if (!infoDiv) {
    return;
  }

  infoDiv.style.display = 'none';
  infoDiv.innerHTML = '';
}