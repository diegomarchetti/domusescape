import os

# Percorso alla cartella contenente i file HTML (modifica se necessario)
cartella_html = "html"

# Iteriamo su tutti i file nella cartella
for nome_file in os.listdir(cartella_html):
    # Verifica che il file termini con ".html" e NON inizi con "sezione-"
    if nome_file.endswith(".html") and not nome_file.startswith("sezione-"):
        # Crea il nuovo nome con il prefisso "sezione-"
        nuovo_nome = f"sezione-{nome_file}"
        
        # Percorso completo al file originale e a quello nuovo
        percorso_vecchio = os.path.join(cartella_html, nome_file)
        percorso_nuovo = os.path.join(cartella_html, nuovo_nome)

        # Rinomina il file
        os.rename(percorso_vecchio, percorso_nuovo)
        print(f"Rinominato: {nome_file} -> {nuovo_nome}")

print("✅ Prefisso 'sezione-' aggiunto a tutti i file HTML.")
