library(shiny)
library(ggplot2)  # for the diamonds dataset

#data
chr <- c("chr1", "chr2")
Start <- c(1000, 200)
Stop <- c(1200, 400)
CNV_type <- c("Del", "Copy")
Quality <- c(0.99, 0.35)
Source <- c("Ref", "Alg1")

cnvData <- data.frame(chr, Start, Stop, CNV_type, Quality, Source)

#UI
ui <- fluidPage(
  titlePanel("Examples of DataTables"),
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
}

shinyApp(ui, server)