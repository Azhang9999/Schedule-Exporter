 var courseIDs = new Set();
document.querySelectorAll("tbody input").forEach((e) => {
    let reg = /checkbox_(\d+)/
    if (e.checked) {
        courseIDs.add(reg.exec(e.id)[1]);
    }
});

var cal = ics();
var checked = (e) => courseIDs.has(e.id);
var setTime = (date, time) => {
    var d = new Date(date.toString());
    d.setHours(Math.floor(time / 100), time % 100);
    return d;
}
var daysMap = {
    M: "MO",
    T: "TU",
    W: "WE",
    R: "TH",
    F: "FR",
    S: "SA",
    U: "SU"
}


var addToCalendar = (e) => {
    let courseObject = e;
    if (courseObject.meetings.length > 0 && checked(e)) {
        var name = courseObject.subjectId + ' ' + courseObject.course + ' ' + courseObject.component;
        courseObject.meetings.forEach( meeting => {
            var location = meeting.building;
            var days = [];
            [...meeting.daysRaw].forEach(d => days.push(daysMap[d]));
            var startDate = meeting.startDate.replace("Z", "");
            var endDate = meeting.endDate.replace("Z", "")
            var rrule = {
                freq: "WEEKLY",
                until: new Date(endDate),
                byday: days,
                interval: 1
            };
            var description = courseObject.title;
            console.log(courseObject)
            startDate = setTime(startDate, meeting.startTime);
            endDate = setTime(startDate, meeting.endTime);
            cal.addEvent(name, description, location, startDate, endDate, rrule);
        });
    }
};
Scheduler.reduxStore.getState().cartSections.forEach(addToCalendar);
Scheduler.reduxStore.getState().registeredSections.forEach(addToCalendar);

cal.download();
