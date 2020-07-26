import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'

const LifeTimeline = ({ subject, events = [], birthday_color = '#F89542', project_days = 200, ...props}) => {
  const [loaded, setLoaded] = useState(false)
  const [lookup, setLookup] = useState({})
  const [lastEventDate, setLastEventDate] = useState(new Date())
  useEffect(() => {
    ReactTooltip.rebuild()
  }, [lookup])
  const [today, setToday] = useState(props.today || new Date())

  const event_end_date = (e) => {
		if (e.date_end) return new Date(e.date_end)
		else return new Date(e.date_start)
	}

  useEffect(() => {
    console.log('events', events)
      let last_event_date = new Date();
  		if (events && events.length > 0) {
  			let latest_event = events.sort((e1, e2) => {
  		    	let e1ref = event_end_date(e1);
  		    	let e2ref = event_end_date(e2);
  		    	if (e2ref > e1ref) return 1;
  		    	else if (e2ref < e1ref) return -1;
  		    	else return 0;
  			})[0];
  			let latest_end = event_end_date(latest_event);
  			if (latest_end > last_event_date) {
  				last_event_date = latest_end;
  			}
  		}
      setLastEventDate(last_event_date)
      generate_lookup()
      setLoaded(true)
    }, [events])

	function print_date(date) {
		var d = date.getDate();
		var month = date.getMonth() + 1;
		var day = d<10? '0'+d:''+d;
		if (month < 10) month = '0'+month;
		return date.getFullYear()+"-"+month+"-"+day;
	}

	function generate_lookup() {
	    // Generate lookup (event list for each date, by ISO date)
	    let lookup = {};
	    all_weeks((week_start, week_end) => {
	    	lookup[print_date(week_start)] = get_events_in_week(week_start, week_end);
	    });
	    setLookup(lookup)
	}

	function single_event(e) {
		return (e.single || !e.date_end || e.date_start == e.date_end) && (!e.ongoing);
	}

	function get_events_in_week(week_start, week_end) {
		let {birthday, name} = subject
		let this_week = today >= week_start && today <= week_end;
		let color = null;
	    let single = false; // Has single events
	    let _events = events.filter((e) => {
	    	let estart = new Date(e.date_start);
	    	let eend = new Date(e.date_end);
	    	if (e.ongoing) eend = new Date();
	    	let start_in_week = estart >= week_start && estart < week_end;
	    	let end_in_week = eend >= week_start && eend < week_end;
	    	let event_spans_week = estart <= week_start && eend >= week_end;
	    	let in_week = start_in_week || end_in_week || event_spans_week;
	    	if (in_week) {
	    		if (e.color) color = e.color;
	    		if (single_event(e)) single = true;
	    	}
	    	return in_week;
	    });
	    if (birthday) {
	    	let age = 0;
	    	let bd_in_week = false;
	    	let week_isos = [];
	    	while (week_start < week_end) {
	    		if (week_start.getMonth() == birthday.getMonth() && week_start.getDate() == birthday.getDate()) {
	    			bd_in_week = true;
	    			age = week_start.getFullYear() - birthday.getFullYear();
	    			break;
	    		}
	    		week_start.setDate(week_start.getDate() + 1);
	    	}
	    	if (bd_in_week) {
	    		color = birthday_color;
	    		let me = name == null;
	    		let title;
	    		let subj = me ? 'I' : name;
	    		if (age == 0) {
	    			let verb = me ? 'am' : 'is';
	    			title = `${subj} ${verb} born!`;
	    		} else {
	    			let verb = me ? 'turn' : 'turns';
					title = `${subj} ${verb} ${age} on ${birthday.getMonth()+1}/${birthday.getDate()}`;
	    		}
	    		_events.push({title: title, color: color});
	    	}
	    }
	    if (this_week) {
	    	color = 'white';
	    	_events.push({title: 'This week', color: color});
	    }
	    return {
	    	events: _events,
	    	color: color,
	    	single: single
	    };
	}

	function get_end() {
		let projected_end = new Date(lastEventDate.getTime());
		projected_end.setDate(projected_end.getDate() + project_days);
		return projected_end;
	}

	function all_weeks(fn) {
		let {birthday} = subject
		let end = get_end();
		let cursor = new Date(birthday.getTime());
		let weeks = [];
		while (cursor <= end) {
			let d = new Date(cursor.getTime());
			cursor.setDate(cursor.getDate() + 7);
			fn(d, new Date(cursor.getTime()));
		}
	}

	function render_week(date_start, date_end) {
		let date = print_date(date_start)
		let res = lookup[date]
		let _single;
		let events = [];
		let color;
		let single = false;
		if (res != null) {
			({events, color, single} = res);
		}
		let future = date_start > today;
		let st = {};
		if (events.length > 0) st.backgroundColor = color || '#1AA9FF';
		let tips = [date].concat(events.map((e) => {
			return e.title;
		}));
		let cls = 'week';
		if (future) cls += ' future';
		if (single) _single = <span className="singleEvents"></span>;
		return <div className={cls} key={date} style={st} data-tip={tips.join(', ')}>{_single}</div>;
	}

	function render_all_weeks() {
		let weeks = [];
		all_weeks((start, end) => {
			weeks.push(render_week(start, end));
		});
		return weeks;
	}

  return (
    <div>
      <ReactTooltip place="top" effect="solid" />
      <div className="LifeTimeline">
        { render_all_weeks() }
      </div>
    </div>
  )
}

export default LifeTimeline
