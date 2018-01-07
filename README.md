# cnvAnalyzer
Projekt na przedmiot MBI (Metody bioinformatyki) na Wydziale Elektroniki i Technik Informacyjnych Politechniki Warszawskiej

## Treść zadania

Celem projektu jest realizacja aplikacji, umożliwiającej wizualizację i przeglądanie wyników z kilku różnych algorytmów do wykrywania zmian liczby kopii przy użyciu danych z NGS. 
Użytkownik powinien mieć możliwość porównania wyników zwróconych przez każdy z algorytmów oraz szybkiej wizualizacji wykrytych rearanżącji dla: 
- zadanych obszarów genomu, 
- dla zadanych genów.

## Dane wejściowe
Dane wejściowe aplikacji przechowywane są w plikach tekstowych w katalogu ```data```

## Technologie
Aplikacja zostanie napisana w języku **TypeScript**, z wykorzystaniem biblioteki **ReactJS** od stworzenia interfejsu graficznego.
Wykresy będą generowane za pomocą biblioteki **plotly.js**


## Sposób uruchomienia
Do uruchomienia aplikacji niezbędne jest zainstalowanie w systemie **Node.js**.
Przed uruchomieniem aplikacji należy w głównym katologu wykonać komendę ```npm install```.

Uruchomienie aplikacji w trybie developerskim z hot reloadingiem następuje po wykonaniu komendy ```npm start```
Aplikacja dostępna jest w przeglądarce pod adresem [http://localhost:3000]()