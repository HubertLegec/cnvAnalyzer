library(shiny)
library(ggplot2)  # for the diamonds dataset

#data
chr <- c("chr1")
Start <- c(1000)
Stop <- c(1200)
CNV_type <- c("Del")
Quality <- c(0.99)
Source <- c("Ref")

cnvData <- data.frame(chr, Start, Stop, CNV_type, Quality, Source)

#UI
ui <- fluidPage(
  titlePanel("Examples of DataTables"),
  fluidRow(DT::dataTableOutput("mytable1"))
)


#Server
server <- function(input, output) {
  output$mytable1 <- DT::renderDataTable({
    DT::datatable(cnvData, options = list(orderClasses = TRUE))
  })
}

shinyApp(ui, server)