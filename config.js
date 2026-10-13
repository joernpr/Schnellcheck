/* =====================================================================
   EINSTELLUNGEN – Formular, E-Mail-Versand und PDF-Bericht
   Nur diese Datei anpassen, die App selbst bleibt unverändert.
   ===================================================================== */
window.PC_CONFIG = {

  // Empfänger der E-Mails aus dem Formular
  empfaenger: 'service@phoenixcontact.de',

  // Optional: Kopie an weitere Adressen, durch Komma getrennt
  kopie: '',

  // Versandart:
  //   'formsubmit' – automatischer Versand im Hintergrund über FormSubmit.co
  //                  (kein eigener Server nötig; die Empfängeradresse muss den
  //                  Versand einmalig über eine Aktivierungs-Mail freischalten)
  //   'endpoint'   – eigener Firmen-Server oder Power-Automate-Flow:
  //                  die Daten werden als JSON per POST an "endpoint" geschickt
  //   'mailto'     – öffnet das E-Mail-Programm des Geräts mit fertiger Nachricht
  versand: 'formsubmit',

  // Nur bei versand: 'endpoint' – Adresse, die die Daten entgegennimmt
  endpoint: '',

  // Betreff: "<Präfix>: Ergebnisbericht CRA-Schnellcheck – <Firma>"
  betreffPraefix: 'Schnellcheck-Anfrage',

  // Text über dem Formular – {bericht} wird durch den Berichtsnamen ersetzt
  formularText: 'Füllen Sie das Formular aus und senden Sie uns Ihren {bericht} per E-Mail oder speichern Sie ihn als PDF. Unsere Experten melden sich bei Ihnen.',

  // Einwilligung zur Werbung als Pflichtfeld?
  //   false = freiwillig (in PDF und E-Mail steht „Ja“ oder „Nein“)
  //   true  = Senden/Export nur mit Haken möglich
  einwilligungPflicht: false,

  // Webadresse der App für den QR-Code (leer = automatisch die aktuelle Adresse)
  // Nur nötig, wenn die App als lokale Datei genutzt wird, z. B.
  // 'https://deinname.github.io/schnellcheck/'
  appUrl: '',

  datenschutzUrl: 'https://www.phoenixcontact.com/de-de/rechtliche-hinweise/datenschutz'
};
