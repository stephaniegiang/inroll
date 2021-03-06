import React, {Component} from 'react'
import './SwapScheduleView.scss'

class SwapScheduleView extends Component {
  
  times = [
    '8:30',
    '9:00',
    '9:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30',
    '18:00',
    '18:30',
    '19:00',
    '19:30',
    '20:00',
    '20:30',
    '21:00',
    '21:30',
    '22:00',
  ]

  drop(elname){
    var el = document.getElementsByClassName(elname)
    for(var i=0; i<el.length; i++){
      if(!el[i].className.includes('selected')){
        el[i].className = 'selected '+elname
      }else{
        el[i].className = 'classEntry '+elname
      }
    }

    var find = document.getElementsByClassName('selected')
    if(find.length !== 0){
      this.props.toggle(8)
    }else{
      this.props.toggle(7)
    }
    
  }

  generateRow = (time, classes) => {
    var rows = []
    var offset = 0

    for (var i = 0; i < 7; i++) {
      var inrange = false
      var found = false
      var collision = false
      var count = 0
      var flag = false
      for (var j = 0; j < classes.length; j++) {
        if (classes[j].Day === i) {
          collision = false

          inrange =
            inrange ||
            (classes[j].Time + classes[j].Length > time &&
              classes[j].Time < time)
          for (var l = 0; l < classes.length; l++) {
            if (
              classes[l].Time + classes[l].Length > time &&
              classes[l].Time <= time &&
              classes[l].Day === i &&
              classes[l].id !== classes[j].id
            ) {
              for (var m = 0; m < classes.length; m++) {
                if (
                  (classes[m].Time + classes[m].Length > classes[l].Time &&
                    classes[m].Time <= classes[l].Time &&
                    classes[m].Day === i &&
                    classes[m].id !== classes[l].id) ||
                  (classes[m].Time + classes[m].Length >=
                    classes[l].Time + classes[l].Length &&
                    classes[m].Time < classes[l].Time + classes[l].Length &&
                    classes[m].Day === i &&
                    classes[m].id !== classes[l].id)
                ) {
                  flag = true
                }
              }

              if (flag) {
                count++
                // console.log("day", i, "time", time, "count", count)
              }
            }
          }
          // if(flag) count++
          if (classes[j].Time === time) {
            for (var k = 0; k < classes.length; k++) {
              collision =
                collision ||
                (classes[k].Time + classes[k].Length > time &&
                  classes[k].Time <= time &&
                  classes[k].Day === i &&
                  classes[k].id !== classes[j].id) ||
                (classes[k].Time + classes[k].Length >=
                  time + classes[j].Length &&
                  classes[k].Time < time + classes[j].Length &&
                  classes[k].Day === i &&
                  classes[k].id !== classes[j].id)
            }
            // console.log(time,i, classes[j].Section,classes[j].Name, "range",inrange,"coll",collision, "count", count)
            var spaned = 2

            if (collision) {
              // offset++
              spaned = 1
            }
            if(classes[j].temp !== undefined){
              rows[classes[j].Day + offset] = (
              <td
                onClick={this.props.drop2}
                rowSpan={classes[j].Length}
                colSpan={spaned}
                
              ><div className = "temp_div">
              <div className="classEntry_temp">
              <p>
                {classes[j].Name}
                <br />
                {classes[j].Section}
                <br />
                {classes[j].Location}
                </p>
                </div>
              </div></td>
            )
            }
            else if(classes[j].diff !== undefined){
              rows[classes[j].Day + offset] = (
              <td
                onClick={this.props.drop}
                rowSpan={classes[j].Length}
                colSpan={spaned}
                
              ><div className = "temp_div">
              <div className="classEntry_seled">
              <p>
                {classes[j].Name}
                <br />
                {classes[j].Section}
                <br />
                {classes[j].Location}
                </p>
                </div>
              </div></td>
            )
            }else{
              rows[classes[j].Day + offset] = (
              <td
                onClick={this.props.proceed}
                rowSpan={classes[j].Length}
                colSpan={spaned}
                
              ><div className = "div">
              <div className="classEntry">
              <p>
                {classes[j].Name}
                <br />
                {classes[j].Section}
                <br />
                {classes[j].Location}
                </p>
                </div>
              </div></td>
            )
            }
            
            found = true
            if (!collision) {
              break
            }else{
              offset++
            }
          }
        }
      }

      if (!(inrange || found)) {
        rows[i + offset] = <td colSpan="2" />
      } else if (count === 2) {
        offset++
        // console.log("day", i, "time", time, "count", count)
        {/*rows.splice(i + offset, 0, <td colSpan="1" />)*/}
      }
    }

    rows = rows.filter(function(val) {
      return val !== null
    })
    return (
      <tr>
        <td colSpan="2" className="timeRow">
          {this.times[time]}
        </td>
        {rows}
      </tr>
    )
  }

  generateTable = () => {
    const header = (
      <tbody>
        <tr>
          <th colSpan="2" className="timeCol">
            Time
          </th>
          <th colSpan="2">Monday</th>
          <th colSpan="2">Tuesday</th>
          <th colSpan="2">Wednesday</th>
          <th colSpan="2">Thursday</th>
          <th colSpan="2">Friday</th>
          <th colSpan="2">Saturday</th>
          <th colSpan="2">Sunday</th>
        </tr>
      </tbody>
    )

    var rows = []
    for (var i = 0; i < 28; i++) {
      rows.push(this.generateRow(i, this.classes))
    }

    return (
      <table>
        {header}
        {rows}
      </table>
    )
  }

  generateDaySchedule = (day) =>{
    var classList = []
    for(var i=0; i < this.classes.length; i++){
      if(this.classes[i].Day == day){
        classList.push(this.classes[i])
      }
    }

    if (classList.length != 0){
      classList.sort(function(a,b){
        return a.Time - b.Time
      })

      var html = classList.map((field, index) => (
        <div
          className={field.diff ? "class-diff" : (field.temp ? "class-temp" : "class")}
        >
          <div className="class-info" onClick={this.props.toggleSearchClassModal}>
            <div className="class-text">
              <div className="class-title">{field.Name}</div>
              <div className="time">{this.times[field.Time]} - {this.times[field.Time + field.Length]}</div>
              <div className="location">{field.Location}</div>
              <div className="type">{field.Section}</div>
            </div>
          </div>
          {field.temp ?
            <div className="class-delete" onClick={this.props.drop2}><i className="fas fa-trash-alt"></i></div> :
            (field.diff ?
              <div className="class-selected" onClick={this.props.drop}><i class="far fa-check-square"></i></div> : 
              <div className="class-select" onClick={this.props.proceed}><i className="far fa-square"></i></div>
            )
          }
        </div>
      ))

      return html
    }else{
      return <div className="class">No classes</div>
    }
  }

  render() {

    switch(this.props.scheduleState){
      case "SWAP_FIN":
        this.classes = 
        [{
          Day: 0,
          Length: 3,
          Name: 'SEG3125',
          Location: 'Mars',
          Section: 'Lecture',
          Time: 9,
          id: 0,
          diff: true
        },
        {
          Day: 2,
          Length: 3,
          Name: 'SEG3125',
          Location: 'Mars',
          Section: 'Lecture',
          Time: 6,
          id: 1,
          diff: true
        },
        {
          Day: 4,
          Length: 3,
          Name: 'SEG3125',
          Location: 'Mars',
          Section: 'Lab',
          Time: 0,
          id: 2,
          diff: true
        },
        {
          Day: 1,
          Length: 6,
          Name: 'FOO3456',
          Location: 'Snip Center',
          Section: 'Lecture',
          Time: 21,
          id: 3,
        },
        {
          Day: 3,
          Length: 3,
          Name: 'FOO3456',
          Location: 'Snip Center',
          Section: 'Lab',
          Time: 8,
          id: 4,
        },
        {
          Day: 0,
          Length: 3,
          Name: 'HOM1234',
          Location: 'Snip Center',
          Section: 'Lecture',
          Time: 9,
          id: 5,
          temp: true
        },
        {
          Day: 2,
          Length: 3,
          Name: 'HOM1234',
          Location: 'Snip Center',
          Section: 'Lecture',
          Time: 12,
          id: 6,
          temp: true
        },
        {
          Day: 2,
          Length: 3,
          Name: 'HOM1234',
          Location: 'Snip Center',
          Section: 'Lab',
          Time: 15,
          id: 7,
          temp: true
        }
        ]
        break
      default:
        this.classes = 
      [{
        Day: 0,
        Length: 3,
        Name: 'SEG3125',
        Location: 'Mars',
        Section: 'Lecture',
        Time: 9,
        id: 0,
      },
      {
        Day: 2,
        Length: 3,
        Name: 'SEG3125',
        Location: 'Mars',
        Section: 'Lecture',
        Time: 6,
        id: 1,
      },
      {
        Day: 4,
        Length: 3,
        Name: 'SEG3125',
        Location: 'Mars',
        Section: 'Lab',
        Time: 0,
        id: 2,
      },
      {
        Day: 1,
        Length: 6,
        Name: 'FOO3456',
        Location: 'Snip Center',
        Section: 'Lecture',
        Time: 21,
        id: 3,
      },
      {
        Day: 3,
        Length: 3,
        Name: 'FOO3456',
        Location: 'Snip Center',
        Section: 'Lab',
        Time: 8,
        id: 4,
      },
      {
        Day: 0,
        Length: 3,
        Name: 'HOM1234',
        Location: 'Snip Center',
        Section: 'Lecture',
        Time: 9,
        id: 5,
        temp: true
      },
      {
        Day: 2,
        Length: 3,
        Name: 'HOM1234',
        Location: 'Snip Center',
        Section: 'Lecture',
        Time: 12,
        id: 6,
        temp: true
      },
      {
        Day: 2,
        Length: 3,
        Name: 'HOM1234',
        Location: 'Snip Center',
        Section: 'Lab',
        Time: 15,
        id: 7,
        temp: true
      }
      ]
  }

    return(
      <div>
      <div className = "Viewtitle">{this.props.viewTitle}</div>
        <div className="schedule-container">
          <div className="swap-schedule-web">{this.generateTable()}</div>
          <div className="swap-schedule-mobile">
            <h2>Monday</h2>
            <div id="monday" className="schedule-block">{this.generateDaySchedule(0)}</div>
            <h2>Tuesday</h2>
            <div id="tuesday" className="schedule-block">{this.generateDaySchedule(1)}</div>
            <h2>Wednesday</h2>
            <div id="wednesday" className="schedule-block">{this.generateDaySchedule(2)}</div>
            <h2>Thursday</h2>
            <div id="thursday" className="schedule-block">{this.generateDaySchedule(3)}</div>
            <h2>Friday</h2>
            <div id="friday" className="schedule-block">{this.generateDaySchedule(4)}</div>
            <h2>Saturday</h2>
            <div id="saturday" className="schedule-block">{this.generateDaySchedule(5)}</div>
            <h2>Sunday</h2>
            <div id="sunday" className="schedule-block">{this.generateDaySchedule(6)}</div>
          </div>
        </div>
        <div className="course-sequence">
          <h1>Recommended Course Sequence</h1>
          Click the course name to add course
          <ul>
            <div className="active-link">
              <li onClick={this.props.toggleSearchClassModal}>SEG3125 - User Interface and User Analysis</li>
              <li  onClick={this.props.toggleSearchClassModal}>FOO3456 - Eating cheese the expert way</li>
            </div>
            <li> Elective *</li>
            <li> Elective *</li>
            <li> Elective *</li>
          </ul>
          <i>* any class can be used. Add a class by clicking the "Add Class" in the sidebar</i>
        </div>
      </div>
    )
  }
}

export default SwapScheduleView
