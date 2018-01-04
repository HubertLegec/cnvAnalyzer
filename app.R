library(shiny)
library(plotly)

#data
chr <- c("chr1", "chr1", "chr1", "chr1")
Start <- c(200, 700, 1000, 1400)
Stop <- c(400, 800, 1200, 1500)
CNV_type <- c("Del", "Copy", "Copy", "Copy")
Quality <- c(0.99, 0.35, 0.22, 0.32)
Source <- c("Ref", "Alg1", "Ref", "Ref")


cnvData <- data.frame(chr, Start, Stop, CNV_type, Quality, Source)

Position <- c(1, 2, 3, 4)
Copies <- c(1, 3, 2, 4)
Deletions <- c(-2, -1, -2, -1)

barData <- data.frame(Position, Copies, Deletions)

#UI
ui <- fluidPage(
  titlePanel("CNV Analyzer"),
  fluidRow(plotlyOutput("plotArea")),
  fluidRow(plotlyOutput("plotBar")),
  fluidRow(
    column(4,
           selectInput("source",
                       "Source:",
                       c("All",
                         unique(as.character(cnvData$Source)))))
  ),
  fluidRow(DT::dataTableOutput("mytable1"))
)


#Server
server <- function(input, output) {
  output$mytable1 <- DT::renderDataTable({
    DT::datatable({
      data<-cnvData
      if(input$source != "All"){
        data<-data[data$Source == input$source,]
      }
      data
      }, 
      options = list(orderClasses = TRUE))
  })
  output$plotArea <- renderPlotly({
    density <- density(diamonds$carat)
    plot_ly(x = ~density$x, y = ~density$y, type = 'scatter', mode = 'lines', fill = 'tozeroy') %>%
      layout(xaxis = list(title = 'Carat', rangeslider = list(type = "number")),
             yaxis = list(title = 'Density'))
  })
  output$plotBar <- renderPlotly({
    plot_ly(data = barData, x = ~Position, y = ~Copies, name = "Copies", type = 'bar') %>%
      add_trace(y = ~Deletions, name = "Deletions") %>%
      layout(xaxis = list(rangeslider = list(type="number")),
             yaxis = list(title = "Count"),
             barmode = 'relative',
             showlegend = FALSE)
  })
}

shinyApp(ui, server)