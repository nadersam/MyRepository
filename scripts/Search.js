var vm;
var ShowAll = 0;
var intervalListener;

//var RemoveCostPricev = 0;
function FormatDate(date) {
    var Fdate = new Date(date);
    var month = Fdate.getMonth() + 1;
    var day = Fdate.getDate();
    var date1 = (('' + day).length < 2 ? '0' : '') + day + '-' + (('' + month).length < 2 ? '0' : '') + month + '-' + Fdate.getFullYear();
    return date1;

}
function sortByCol(arr, colIndex) {
    arr.sort(sortFunction)
    function sortFunction(a, b) {
        a = a[colIndex]
        b = b[colIndex]
        return (a === b) ? 0 : (a < b) ? -1 : 1
    }
}
function isToday(idate) {
    var today = new Date().getDate(),
        idate = new Date(idate).getDate()
    return (today - idate) == 0 ? true : false;
}
function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    //a.setHours(a.getHours() - 3);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    if (min < 10) {
        min = '0' + min;
    }
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    return time.toLocaleString();
}
function sort(valuePath, array) {
    let path = valuePath.split('.')

    return array.sort((a, b) => {
        return getValue(b, path) - getValue(a, path)
    });

    function getValue(obj, path) {
        path.forEach(path => obj = obj[path])
        return obj;
    }
}
function GetHour(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    a.setHours(a.getHours() - 3);
    var hour = a.getHours();
    return hour
}
function convertunixdatetime(UNIX_timestamp) {
    new Date(UNIX_timestamp * 1000).toLocaleString();

}
function getFormateDate(t, e) {
    if (!t || -1 === ["prev", "current", "next"].indexOf(e))
        throw new Error("invalid day or type");
    var n = this.curMonthDatePrefix;
    return "prev" === e ? n = this.prevMonthDatePrefix : "next" === e && (n = this.nextMonthDatePrefix),
        t = ("00" + t).slice(-2),
        n + "-" + t
}
function FormatISODate(date) {
    var dd;
    if (date instanceof Date && !isNaN(date.valueOf())) {
        dd = date;
    } else if (date.split('-')[0].length == 4) {
        dd = date;
    } else {
        dd = date.split('-')[2] + '-' + date.split('-')[1] + '-' + date.split('-')[0];
    }

    var Fdate = new Date(dd);
    var month = Fdate.getMonth() + 1;
    var day = Fdate.getDate();
    var date1 = Fdate.getFullYear() + '-' + (('' + month).length < 2 ? '0' : '') + month + '-' + (('' + day).length < 2 ? '0' : '') + day;
    return date1;

}
function FormatISODateTime(date) {
    var dd;
    var tt;
    dd = date.split(' ')[0];
    tt = date.split(' ')[1] + ':00';
    dd = date.split('-')[2] + '-' + date.split('-')[1] + '-' + date.split('-')[0];
    var Fdate = new Date(dd);
    var month = Fdate.getMonth() + 1;
    var day = Fdate.getDate();
    var date1 = Fdate.getFullYear() + '-' + (('' + month).length < 2 ? '0' : '') + month + '-' + (('' + day).length < 2 ? '0' : '') + day;
    return date1 + ' ' + tt;

}
function FormatTime(date) {
    var Fdate = new Date(date);
    var hour = Fdate.getHours();
    var Mint = Fdate.getMinutes();
    if (Mint < 10) {
        Mint = '0' + Mint;
    }
    var date1 = hour + ':' + Mint;
    return date1;

}
function FormatDateTime(date) {
    var Fdate = new Date(date);
    var month = Fdate.getMonth() + 1;
    var day = Fdate.getDate();
    var hour = Fdate.getHours();
    var Mint = Fdate.getMinutes();
    if (Mint < 10) {
        Mint = '0' + Mint;
    }
    var date1 = (('' + day).length < 2 ? '0' : '') + day + '-' + (('' + month).length < 2 ? '0' : '') + month + '-' + Fdate.getFullYear() + ' ' + hour + ':' + Mint;
    return date1;

}
function FormatISODate(date) {
    var dd;
    if (date instanceof Date && !isNaN(date.valueOf())) {
        dd = date;
    } else if (date.split('-')[0].length == 4) {
        dd = date;
    } else {
        dd = date.split('-')[2] + '-' + date.split('-')[1] + '-' + date.split('-')[0];
    }
    var Fdate = new Date(dd);
    var month = Fdate.getMonth() + 1;
    var day = Fdate.getDate();
    var date1 = Fdate.getFullYear() + '-' + (('' + month).length < 2 ? '0' : '') + month + '-' + (('' + day).length < 2 ? '0' : '') + day;
    return date1;

}
$(document).ready(function () {
    var date = new Date();
    vm = new MainViewModel();
    vm.Execute("https://crm.blafx.com/crm/followConsumer/getOrder?mt5Login=5506597&orderType=1");
    vm.Execute1("https://crm.blafx.com/crm/followConsumer/getOrder?mt5Login=1001015&orderType=1");

    ko.applyBindings(vm);
});
$(document).ajaxStart(function () {
    $("#loader-wrapper").fadeIn('slow', function () {
        $("#loader-wrapper").show();
    });

});
$(document).ajaxComplete(function () {
    $("#loader-wrapper").fadeOut('slow', function () {
        $("#loader-wrapper").hide();
    });
});

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return undefined;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var MainViewModel = function () {
    var self = this;
    self.UserKey = getParameterByName('userkey');
    self.Stats = ko.observableArray([]);
    self.Results = ko.observableArray([]); 
    self.Stats2 = ko.observableArray([]);
    self.Results2 = ko.observableArray([]);
    self.Compare = ko.observableArray([]);
    self.URL = ko.observable(""); 
    self.Ark4More = ko.observable("0"); 
    self.Ark3More = ko.observable("0"); 
    self.selectedRow = ko.observable();
    self.Traders = ko.observableArray([]);
    self.BestTraders = ko.observableArray([]);
    self.row_selected = function (item) {
        //if (item.sys_key() == self.selectedRow()) {
        //    $('tr[id^="row_selected"]').removeClass('row_selected');
        //    self.selectedRow("");
        //} else {
        //    self.selectedRow(item.sys_key());
        //    self.FillShelf();
        //    self.FillUnits(item.sys_key());
        //    self.FillDetails(item.sys_key());
        //    $('tr[id^="row_selected"]').removeClass('row_selected');
        //    $("#row_selected" + item.sys_key()).addClass('row_selected');
        //    $("#StockModal").modal({ backdrop: "static" });
        //}
    };
    self.Execute = function (URL) {              
        $.ajax({
            url: URL,
            type: 'GET',
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                var dataMapped = $.map(data.rows, function (item) { return new DrugsSearchListEntity(item); });
                self.Results(dataMapped);
                if (isToday(self.Results()[0].open_time()) == true) {
                    document.getElementById('ark4label').style.backgroundColor = 'green';
                }
                ko.utils.arrayForEach(vm.Results(), function (Res) {
                    if (vm.Stats().length == 0) {
                        vm.Stats.push(new StatsEntity({ Hour: Res.OpenHour(), Count: 1 }));
                    }
                    var found = false;
                    for (var xx = 0; xx <= vm.Stats().length - 1; xx++) {                      
                        if (vm.Stats()[xx].Hour() == Res.OpenHour()) {
                            found = true;
                            break;
                        }                       
                    }
                    if (found == false) {
                        vm.Stats.push(new StatsEntity({ Hour: Res.OpenHour(), Count: 1 }));
                    } else {
                        vm.Stats()[xx].Count(parseInt(vm.Stats()[xx].Count()) + 1);
                    }
                });
                vm.Stats(vm.Stats().sort((a, b) => (a.Count() > b.Count()) ? -1 : ((b.Count() > a.Count()) ? 1 : 0)));
            },
            error: function (request) {
                console.log(request);
            }
        });
    }
    self.Execute1 = function (URL) {
        $.ajax({
            url: URL,
            type: 'GET',
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                var dataMapped = $.map(data.rows, function (item) { return new DrugsSearchListEntity(item); });
                self.Results2(dataMapped);
                if (isToday(self.Results2()[0].open_time()) == true) {
                    document.getElementById('ark3label').style.backgroundColor = 'green';
                }
                ko.utils.arrayForEach(vm.Results2(), function (Res) {
                    if (vm.Stats2().length == 0) {
                        vm.Stats2.push(new StatsEntity({ Hour: Res.OpenHour(), Count: 1 }));
                    }
                    var found = false;
                    for (var xx = 0; xx <= vm.Stats2().length - 1; xx++) {
                        if (vm.Stats2()[xx].Hour() == Res.OpenHour()) {
                            found = true;
                            break;
                        }
                    }
                    if (found == false) {
                        vm.Stats2.push(new StatsEntity({ Hour: Res.OpenHour(), Count: 1 }));
                    } else {
                        vm.Stats2()[xx].Count(parseInt(vm.Stats2()[xx].Count()) + 1);
                    }
                });
                vm.Stats2(vm.Stats2().sort((a, b) => (a.Count() > b.Count()) ? -1 : ((b.Count() > a.Count()) ? 1 : 0)));
                setTimeout(function () {
                    self.GenerateCompareData();
                }, 2000);
                
            },
            error: function (request) {
                console.log(request);
            }
        });
    }
    self.GenerateCompareData = function () {
        ko.utils.arrayForEach(vm.Results(), function (Res) {
            ko.utils.arrayForEach(vm.Results2(), function (Res2) {
                if (new Date(Res.openTimeOrig() * 1000).getDate() == new Date(Res2.openTimeOrig() * 1000).getDate() && new Date(Res.openTimeOrig() * 1000).getMonth() == new Date(Res2.openTimeOrig() * 1000).getMonth()) {
                    vm.Compare.push(new CompareEntity({ open_time4: timeConverter(Res.openTimeOrig()), OpenHour4: Res.OpenHour(), open_time3: timeConverter(Res2.openTimeOrig()), OpenHour3: Res2.OpenHour() }));
                }
            });
        });
        ko.utils.arrayForEach(vm.Compare(), function (Comp) {
            if (parseInt(Comp.OpenHour4()) > parseInt(Comp.OpenHour3())) {
                self.Ark4More(parseInt(self.Ark4More()) + 1);
            } else if (parseInt(Comp.OpenHour3()) > parseInt(Comp.OpenHour4())) {
                self.Ark3More(parseInt(self.Ark3More()) + 1);
            }
        });
    }
    intervalListener = setInterval(function () {
        self.TradeCheck();
    }
        , 300000);
    self.TradeCheck = function () {
        $.ajax({
            url: "/BlafxData/api/Blafx/TradeCheck",
            type: 'GET',
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                //alert(data);
            },
            error: function (request) {
                console.log(request);
            }
        });
    }
    self.GetBestTrades = function () {
        $.ajaxSetup({
            async: false
        });
        $.ajax({
            url: "https://crm.blafx.com/crm/followConsumer/consumerList?pageSize=100&pageNum=1&signalName=&rangeTime=5&riskLevelType=&minBalance=&prioritizing=2",
            type: 'GET',
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                var dataMapped = $.map(data.rows, function (item) { return new TradersEntity(item); });
                self.Traders(dataMapped);
                ko.utils.arrayForEach(vm.Traders(), function (Trader) {
                    //console.log('outer traders loop' + Trader.TraderID());
                    if (Trader.Risk() == 1 || Trader.Risk() == 2) {
                        $.ajaxSetup({
                            async: false
                        });
                        $.ajax({
                            url: "https://crm.blafx.com/crm/followConsumer/getOrder?mt5Login=" + Trader.TraderID() + "&orderType=1",
                            type: 'GET',
                            dataType: "json",
                            contentType: "application/json; charset=utf-8",
                            success: function (data) {
                                var losscnt = 0;
                                var profitcnt = 0;
                                var profittotal = 0;
                                var lasttrans;
                                for (i = 0; i <= data.rows.length - 1; i++) {
                                    //console.log('inner trader loop' + Trader.TraderID());
                                    if (i == 0) {
                                        lasttrans = timeConverter(data.rows[i].openTime);
                                    }
                                    profittotal = parseFloat(profittotal) + parseFloat(data.rows[i].price);
                                    if (parseFloat(data.rows[i].price) > 0) {
                                        profitcnt = parseInt(profitcnt) + 1;
                                    } else if (parseFloat(data.rows[i].price) < 0) {
                                        losscnt = parseInt(losscnt) + 1;
                                    }
                                }
                                vm.BestTraders.push(new BestTradersEntity({ TraderName: Trader.TraderName(), TraderID: Trader.TraderID(), TotalProfit: profittotal, ProfitCnt: profitcnt, LossCnt: losscnt, LastTrans: lasttrans, Risk: Trader.Risk(),profitRate: Trader.ProfitRate() }));
                            },
                            error: function (request) {
                                console.log(request);
                            }
                        });
                    }
                });
            },
            error: function (request) {
                console.log(request);
            }
        });
    }
    self.ItemKeyPressed = function (item, e) {
        if (e.keyCode == 13) {
            self.Execute();
        }
        return true;
    }

}
function CodeListEntity(item) {
    var self = this;
    self.Code = ko.observable(item.Code);
    self.Desc = ko.observable(item.Desc);
    self.ItemChecked = ko.observable(item.ItemChecked);
}
function StatsEntity(item) {
    var self = this;
    self.Hour = ko.observable(item.Hour);
    self.Count = ko.observable(item.Count);
}
function BestTradersEntity(item) {
    var self = this;
    self.TraderName = ko.observable(item.TraderName);
    self.TraderID = ko.observable(item.TraderID);
    self.TotalProfit = ko.observable(item.TotalProfit);
    self.ProfitCnt = ko.observable(item.ProfitCnt);
    self.LossCnt = ko.observable(item.LossCnt);
    self.LastTrans = ko.observable(item.LastTrans);
    self.Risk = ko.observable(item.Risk);
    self.ProfitRate = ko.observable(item.profitRate);
}
function TradersEntity(item) {
    var self = this;
    self.TraderName = ko.observable(item.signalName);
    self.TraderID = ko.observable(item.signalLogin);
    self.LastTrans = ko.observable(timeConverter(item.openTime));
    self.Risk = ko.observable(item.riskScore);
    self.ProfitRate = ko.observable(item.profitRate);
}
function CompareEntity(item) {
    var self = this;
    self.open_time4 = ko.observable(item.open_time4);
    self.OpenHour4 = ko.observable(item.OpenHour4);
    self.open_time3 = ko.observable(item.open_time3);
    self.OpenHour3 = ko.observable(item.OpenHour3);
}
function DrugsSearchListEntity(item) {
    var self = this;
    self.open_time = ko.observable(timeConverter(item.openTime));
    self.close_time = ko.observable(timeConverter(item.closeTime));
    self.open_price = ko.observable(item.openPrice);
    self.close_price = ko.observable(item.closePrice);
    self.order_no = ko.observable(item.order);
    self.price = ko.observable(item.price);
    self.volume = ko.observable(item.volume);
    self.OpenHour = ko.observable(GetHour(item.openTime));
    self.openTimeOrig = ko.observable(item.openTime);
}