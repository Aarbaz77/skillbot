/**
 * scroll to the bottom of the chats after new message has been added to chat
 */
const converter = new showdown.Converter();
function scrollToBottomOfResults() {
    const terminalResultsDiv = document.getElementById("chats");
    terminalResultsDiv.scrollTop = terminalResultsDiv.scrollHeight;
}


/**
 * Set user response on the chat screen
 * @param {String} message user message
 */
function setUserResponse(message) {
    const user_response = `<img class="userAvatar" src='./static/img/userAvatar.jpg'><p class="userMsg">${message} </p><div class="clearfix"></div>`;
    $(user_response).appendTo(".chats").show("slow");

    $(".usrInput").val("");
    scrollToBottomOfResults();
    showBotTyping();
    $(".suggestions").remove();
}

function myFunction(el) {
  console.log($(el).prev())
  $(el).prev().toggle();
  $(el).siblings('.dots').toggle();
  if($(el).text()==" Read More"){
    $(el).text(' Read Less');
  }
  else{
    $(el).text(' Read More');
  }
}
function urlify(text) {
    var urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    return text.replace(urlRegex, function(url) {
      return "</br><a href="+url+" target='_blank'>"+url+"  </a></br>";
    })
    // or alternatively
    // return text.replace(urlRegex, '<a href="$1">$1</a>')
  }
/**
 * returns formatted bot response
 * @param {String} text bot message response's text
 *
 */


function getBotResponse(text) {
    console.log(text.length)
    console.log(text)
    var content = text
    var showChar = 120

    const firstPart = content.substr(0, showChar);
    const morePart = content.substr(showChar, content.length - showChar);
    console.log(firstPart)
    checkMsgs(firstPart)
    console.log(morePart)
    if(content.length>showChar){
      botResponse = `<img class="botAvatar" src="./static/img/chatlogo.jpg"/><p class="botMsg"><span>${firstPart}</span><span class="dots">...</span><span class="more">${morePart}</span><button onclick=myFunction(this) class="read"> Read More</button></p><div class="clearfix"></div>`;
    }
    else{
      botResponse = `<img class="botAvatar" src="./static/img/chatlogo.jpg"/><p class="botMsg">${content}</p><div class="clearfix"></div>`;
    }
    // botResponse = `<img class="botAvatar" src="./static/img/chatlogo.jpg"/><span class="botMsg">${text}</span><div class="clearfix"></div>`;
    return botResponse;
}

/**
 * renders bot response on to the chat screen
 * @param {Array} response json array containing different types of bot response
 *
 * for more info: `https://rasa.com/docs/rasa/connectors/your-own-website#request-and-response-format`
 */
function setBotResponse(response) {
    // renders bot response after 500 milliseconds
    setTimeout(() => {
        hideBotTyping();
        if (response.length < 1) {
            // if there is no response from Rasa, send  fallback message to the user
            const fallbackMsg = "I am facing some issues, please try again later!!!";

            const BotResponse = `<img class="botAvatar" src="./static/img/chatlogo.jpg"/><p class="botMsg">${fallbackMsg}</p><div class="clearfix"></div>`;

            $(BotResponse).appendTo(".chats").hide().fadeIn(1000);
            scrollToBottomOfResults();
        } else {
            // if we get response from Rasa
            for (let i = 0; i < response.length; i += 1) {
                // check if the response contains "text"
                if (Object.hasOwnProperty.call(response[i], "text")) {
                    if (response[i].text != null) {
                        // convert the text to mardown format using showdown.js(https://github.com/showdownjs/showdown);
                        let botResponse;
                        // let html = converter.makeHtml(response[i].text);
                        // html = html.replaceAll("<p>", "").replaceAll("</p>", "").replaceAll("<strong>", "<b>").replaceAll("</strong>", "</b>");
                        // html = html.replace(/(?:\r\n|\r|\n)/g, '<br>')
                        // console.log(html);
                        // check for blockquotes
                        // if (html.includes("<blockquote>")) {
                        //     // html = html.replaceAll("<br>", "");
                        //     botResponse = getBotResponse(html);
                        // }
                        // // check for image
                        // if (html.includes("<img")) {
                        //     // html = html.replaceAll("<img", '<img class="imgcard_mrkdwn" ');
                        //     botResponse = getBotResponse(html);
                        // }
                        // // check for preformatted text
                        // if (html.includes("<pre") || html.includes("<code>")) {
                        //
                        //     botResponse = getBotResponse(html);
                        // }
                        // // check for list text
                        // if (html.includes("<ul") || html.includes("<ol") || html.includes("<li") || html.includes('<h3')) {
                        //     // html = html.replaceAll("<br>", "");
                        //     // botResponse = `<img class="botAvatar" src="./static/img/sara_avatar.png"/><span class="botMsg more">${html}</span><div class="clearfix"></div>`;
                        //     botResponse = getBotResponse(html);
                        // }
                        // else {
                            // if no markdown formatting found, render the text as it is.
                            if (!botResponse) {
                              console.log(response[i].text.length)
                              content = response[i].text
                              content = content.replace(/(?:\r\n|\r|\n)/g, '<br>')
                              content = urlify(content)
//                               var hlink = /\s(ht|f)tp:\/\/([^ \,\;\:\!\)\(\"\'\<\>\f\n\r\t\v])+/g;
//                               content = content.replace (hlink, function ($0,$1,$2) { content = $0.substring(1,$0.length);
//                                 // remove trailing dots, if any
//                                 while (content.length>0 && content.charAt(s.length-1)=='.')
//                                    content=content.substring(0,content.length-1);
//                                 // add hlink
//                                 return " " + content.link(content);
//                               }
//   )
                              showChar = 5000
                              const firstPart = content.substr(0, showChar);
                              const morePart = content.substr(showChar, content.length - showChar);
                              console.log(firstPart)
                              console.log(morePart)
                              checkMsgs(firstPart)
                              if(content.length>showChar){
                                botResponse = `<img class="botAvatar" src="./static/img/chatlogo.jpg"/><p class="botMsg"><span>${firstPart}</span><span class="dots">...</span><span class="more">${morePart}</span><button onclick=myFunction(this) class="read"> Read More</button></p><div class="clearfix"></div>`;
                              }
                              else{
                                botResponse = `<img class="botAvatar" src="./static/img/chatlogo.jpg"/><p class="botMsg">${content}</p><div class="clearfix"></div>`;
                              }
                            }
                        // }
                        // append the bot response on to the chat screen
                        $(botResponse).appendTo(".chats").hide().fadeIn(1000);
                    }
                }

                // check if the response contains "images"
                if (Object.hasOwnProperty.call(response[i], "image")) {
                    if (response[i].image !== null) {
                        const BotResponse = `<div class="singleCard"><img class="imgcard" src="${response[i].image}"></div><div class="clearfix">`;

                        $(BotResponse).appendTo(".chats").hide().fadeIn(1000);
                    }
                }

                // check if the response contains "buttons"
                if (Object.hasOwnProperty.call(response[i], "buttons")) {
                    if (response[i].buttons.length > 0) {
                        addSuggestion(response[i].buttons);
                    }
                }

                // check if the response contains "attachment"
                if (Object.hasOwnProperty.call(response[i], "attachment")) {
                    if (response[i].attachment != null) {
                        if (response[i].attachment.type === "video") {
                            // check if the attachment type is "video"
                            const video_url = response[i].attachment.payload.src;

                            const BotResponse = `<div class="video-container"> <iframe src="${video_url}" frameborder="0" allowfullscreen></iframe> </div>`;
                            $(BotResponse).appendTo(".chats").hide().fadeIn(1000);
                        }
                    }
                }
                // check if the response contains "custom" message
                if (Object.hasOwnProperty.call(response[i], "custom")) {
                    const { payload } = response[i].custom;
                    if (payload === "quickReplies") {
                        // check if the custom payload type is "quickReplies"
                        const quickRepliesData = response[i].custom.data;
                        showQuickReplies(quickRepliesData);
                        return;
                    }

                    // check if the custom payload type is "pdf_attachment"
                    if (payload === "pdf_attachment") {
                        renderPdfAttachment(response[i]);
                        return;
                    }

                    // check if the custom payload type is "dropDown"
                    if (payload === "dropDown") {
                        const dropDownData = response[i].custom.data;
                        renderDropDwon(dropDownData);
                        return;
                    }

                    // check if the custom payload type is "location"
                    if (payload === "location") {
                        $("#userInput").prop("disabled", true);
                        getLocation();
                        scrollToBottomOfResults();
                        return;
                    }

                    // check if the custom payload type is "cardsCarousel"
                    if (payload === "cardsCarousel") {
                        const restaurantsData = response[i].custom.data;
                        showCardsCarousel(restaurantsData);
                        return;
                    }

                    // check if the custom payload type is "chart"
                    if (payload === "chart") {
                        /**
                         * sample format of the charts data:
                         *  var chartData =  { "title": "Leaves", "labels": ["Sick Leave", "Casual Leave", "Earned Leave", "Flexi Leave"], "backgroundColor": ["#36a2eb", "#ffcd56", "#ff6384", "#009688", "#c45850"], "chartsData": [5, 10, 22, 3], "chartType": "pie", "displayLegend": "true" }
                         */

                        const chartData = response[i].custom.data;
                        const {
                            title,
                            labels,
                            backgroundColor,
                            chartsData,
                            chartType,
                            displayLegend,
                        } = chartData;

                        // pass the above variable to createChart function
                        createChart(
                            title,
                            labels,
                            backgroundColor,
                            chartsData,
                            chartType,
                            displayLegend,
                        );

                        // on click of expand button, render the chart in the charts modal
                        $(document).on("click", "#expand", () => {
                            createChartinModal(
                                title,
                                labels,
                                backgroundColor,
                                chartsData,
                                chartType,
                                displayLegend,
                            );
                        });
                        return;
                    }

                    // check of the custom payload type is "collapsible"
                    if (payload === "collapsible") {
                        const { data } = response[i].custom;
                        // pass the data variable to createCollapsible function
                        createCollapsible(data);
                    }
                }
            }
            scrollToBottomOfResults();
        }
        $(".usrInput").focus();
    }, 500);

}
function checkMsgs(text){
  console.log("This is called")
  console.log(text)
  if (text == "Please enter"){
    document.getElementById("wholeTextdiv").style.display = "block";
    // document.getElementById("userInput").disabled = false;
    // document.getElementById("userInput").style.display = "block";
  }
  else {
    document.getElementById("wholeTextdiv").style.display = "none";
    // document.getElementById("userInput").disabled = true;
    // document.getElementById("userInput").style.display = "none";
  }

}
/**
 * sends the user message to the rasa server,
 * @param {String} message user message
 */
function send(message) {
    $.ajax({
        url: rasa_server_url,
        headers: {  'Access-Control-Allow-Origin': 'http://52.56.102.72' },
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({ message, sender: sender_id }),
        success(botResponse, status) {
            console.log("Response from Rasa: ", botResponse, "\nStatus: ", status);

            // if user wants to restart the chat and clear the existing chat contents
            if (message.toLowerCase() === "/restart") {
                $("#userInput").prop("disabled", false);

                // if you want the bot to start the conversation after restart
                // customActionTrigger();
                return;
            }
            setBotResponse(botResponse);
        },
        error(xhr, textStatus) {
            if (message.toLowerCase() === "/restart") {
                $("#userInput").prop("disabled", false);
                // if you want the bot to start the conversation after the restart action.
                // actionTrigger();
                // return;
            }

            // if there is no response from rasa server, set error bot response
            setBotResponse("");
            console.log("Error from bot end: ", textStatus);
        },
    });
}
/**
 * sends an event to the bot,
 *  so that bot can start the conversation by greeting the user
 *
 * `Note: this method will only work in Rasa 1.x`
 */
// eslint-disable-next-line no-unused-vars
function actionTrigger() {
    $.ajax({
        url: `http://localhost:5005/conversations/${sender_id}/execute`,
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            name: action_name,
            policy: "MappingPolicy",
            confidence: "0.98",
        }),
        success(botResponse, status) {
            console.log("Response from Rasa: ", botResponse, "\nStatus: ", status);

            if (Object.hasOwnProperty.call(botResponse, "messages")) {
                setBotResponse(botResponse.messages);
            }
            $("#userInput").prop("disabled", false);
        },
        error(xhr, textStatus) {
            // if there is no response from rasa server
            setBotResponse("");
            console.log("Error from bot end: ", textStatus);
            $("#userInput").prop("disabled", false);
        },
    });
}

/**
 * sends an event to the custom action server,
 *  so that bot can start the conversation by greeting the user
 *
 * Make sure you run action server using the command
 * `rasa run actions --cors "*"`
 *
 * `Note: this method will only work in Rasa 2.x`
 */
// eslint-disable-next-line no-unused-vars
function customActionTrigger() {
    $.ajax({
        url: "http://localhost:5055/webhook/",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            next_action: action_name,
            tracker: {
                sender_id,
            },
        }),
        success(botResponse, status) {
            console.log("Response from Rasa: ", botResponse, "\nStatus: ", status);

            if (Object.hasOwnProperty.call(botResponse, "responses")) {
                setBotResponse(botResponse.responses);
            }
            $("#userInput").prop("disabled", false);
        },
        error(xhr, textStatus) {
            // if there is no response from rasa server
            setBotResponse("");
            console.log("Error from bot end: ", textStatus);
            $("#userInput").prop("disabled", false);
        },
    });
}



/**
 * clears the conversation from the chat screen
 * & sends the `/resart` event to the Rasa server
 */
function restartConversation() {
    $("#userInput").prop("disabled", true);
    // destroy the existing chart
    $(".collapsible").remove();

    if (typeof chatChart !== "undefined") {
        chatChart.destroy();
    }

    $(".chart-container").remove();
    if (typeof modalChart !== "undefined") {
        modalChart.destroy();
    }
    $(".chats").html("");
    $(".usrInput").val("");
    send("/restart");
}

function isEmpty( el ){
      return !$.trim(el.html())
  }

function startChat(){
  const text = "/greet";
  // send(text)
    if (isEmpty($('#chats'))){
    send(text)
    showBotTyping();
  };
}
// triggers restartConversation function.
$("#restart").click(() => {
    restartConversation();
    startChat();
});

/**
 * if user hits enter or send button
 * */
$(".usrInput").on("keyup keypress", (e) => {
    const keyCode = e.keyCode || e.which;

    const text = $(".usrInput").val();
    if (keyCode === 13) {
        if (text === "" || $.trim(text) === "") {
            e.preventDefault();
            return false;
        }
        // destroy the existing chart, if yu are not using charts, then comment the below lines
        $(".collapsible").remove();
        $(".dropDownMsg").remove();
        if (typeof chatChart !== "undefined") {
            chatChart.destroy();
        }

        $(".chart-container").remove();
        if (typeof modalChart !== "undefined") {
            modalChart.destroy();
        }

        $("#paginated_cards").remove();
        $(".suggestions").remove();
        $(".quickReplies").remove();
        $(".usrInput").blur();
        setUserResponse(text);
        send(text);
        e.preventDefault();
        return false;
    }
    return true;
});

$("#sendButton").on("click", (e) => {
    const text = $(".usrInput").val();
    if (text === "" || $.trim(text) === "") {
        e.preventDefault();
        return false;
    }
    // destroy the existing chart
    if (typeof chatChart !== "undefined") {
        chatChart.destroy();
    }

    $(".chart-container").remove();
    if (typeof modalChart !== "undefined") {
        modalChart.destroy();
    }

    $(".suggestions").remove();
    $("#paginated_cards").remove();
    $(".quickReplies").remove();
    $(".usrInput").blur();
    $(".dropDownMsg").remove();
    setUserResponse(text);
    send(text);
    e.preventDefault();
    return false;
});

$("#profile_div").on("click", (e) => {
  $(".profile_div").toggle();
  $(".widget").toggle();
  startChat();
});
var botMsgcheck = document.querySelector(".botMsg")
