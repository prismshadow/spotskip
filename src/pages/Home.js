import ReactECharts from "echarts-for-react";
import axios from "axios";
import HeroSection from "../components/HeroSection";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const API_KEY = process.env.REACT_APP_BEST_TIME_API_KEY;

function Home() {
  const [options, setOptions] = useState({
    title: {
      text: "Today's foot traffic",
    },
    tooltip: {
      show: true,
      formatter: "{c}% vs max <br> max of the week",
    },
    xAxis: {
      show: true,
      nameTextStyle: {
        color: "#b5b5b5",
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: true,
        showMinLabel: true,
        showMaxLabel: true,
        interval: 3,
        color: "#b5b5b5",
        align: "center",
      },
      //   nameGap: 40,
      data: [
        "6AM",
        "7AM",
        "8AM",
        "9AM",
        "10AM",
        "11AM",
        "12PM",
        "1PM",
        "2PM",
        "3PM",
        "4PM",
        "5PM",
        "6PM",
        "7PM",
        "8PM",
        "9PM",
        "10PM",
        "11PM",
        "12AM",
        "1AM",
        "2AM",
        "3AM",
        "4AM",
        "5AM",
      ],
    },
    yAxis: {
      show: true,
      min: 0,
      max: 100,
      interval: 100,
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: true,
        interval: 100,
        showMaxLabel: true,
        showMinLabel: false,
        color: "#b5b5b5",
        formatter: function (value) {
          return value + "%";
        },
      },
      splitline: {
        show: false,
      },
    },
    grid: {
      left: 40,
      top: 30,
      right: 0,
      bottom: 20,
    },
    series: [
      {
        type: "bar",
      },
    ],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showData, setShowData] = useState(false);
  const [busyHours, setBusyHours] = useState("");
  const [liveDelta, setLiveDelta] = useState(0);
  const graphDivRef = useRef();

  const saveBusyHours = (busyHours) => {
    const todayBusyHours = busyHours;
    if (todayBusyHours.length === 0) {
      setBusyHours(["No busy hours today"]);
      return;
    }
    let firstBusyHour = todayBusyHours[0];
    let lastBusyHour = todayBusyHours[todayBusyHours.length - 1];
    let firstBusyHourStr = "";
    let lastBusyHourStr = "";
    if (firstBusyHour < 12) {
      firstBusyHourStr = firstBusyHour + "AM";
    } else if (firstBusyHour === 12) {
      firstBusyHourStr = firstBusyHour + "PM";
    } else {
      firstBusyHourStr = firstBusyHour - 12 + "PM";
    }
    if (lastBusyHour < 12) {
      lastBusyHourStr = lastBusyHour + "AM";
    } else if (lastBusyHour === 12) {
      lastBusyHourStr = lastBusyHour + "PM";
    } else {
      lastBusyHourStr = lastBusyHour - 12 + "PM";
    }

    setBusyHours(
      "It will be busy from " + firstBusyHourStr + " to " + lastBusyHourStr
    );
  };

  const getFootTrafficData = async (venueName, venueAddress) => {
    setError(false);
    setLoading(true);
    const d = new Date();
    let dayInt = d.getDay() < 6 ? d.getDay() + 1 : 0;
    console.log(API_KEY);
    const params = new URLSearchParams({
      api_key_private: API_KEY,
      venue_name: venueName,
      venue_address: venueAddress,
    });
    const response = await axios
      .post(`https://besttime.app/api/v1/forecasts?${params}`)
      .catch((err) => {
        console.log(err.response.data);
        // if error is received from the server
        setLoading(false);
        // display the error message
        toast.error(err.response.data.message);
        setError(true);
        return;
      });
    if (!response) return;
    const data = response.data;

    const dataToday = data["analysis"][dayInt.toString()];
    saveBusyHours(dataToday.busy_hours);

    const liveResponse = await axios
      .post(`https://besttime.app/api/v1/forecasts/live?${params}`)
      .catch((err) => {
        // if error is received from the server
        setLoading(false);
        // display the error message
        toast.error(err.response.data.message);
        setError(true);
        return;
      });
    if (!liveResponse) return;
    const dataLive = liveResponse.data;
    const delta = dataLive.analysis.venue_live_forecasted_delta;
    console.log(delta);
    setLiveDelta(delta);

    let pct = dataLive.analysis.venue_live_busyness;
    let liveLabelOffsetHor = -5;

    if (pct > 80) {
      liveLabelOffsetHor = 30;
    }
    let hour_start_12 = dataLive.analysis.hour_start_12;

    const newOptions = {
      title: {
        text:
          "Today's foot traffic for " +
          data.venue_info.venue_name +
          " " +
          data.venue_info.venue_address,
      },
      series: [
        {
          name: "Forecasted busyness",
          clip: false,
          type: "bar",
          itemStyle: {
            color: "#7dabf4",
          },
          z: 0,
          data: dataToday.day_raw,
          barWidth: 20,
        },
        {
          name: "Live busyness",
          barWidth: 20,
          type: "bar",
          z: 1,
          data: [
            {
              value: [hour_start_12, pct],
              itemStyle: {
                color: "#f50057",
                shadowBlur: 30,
                shadowOffsetX: 1,
                opacity: 0.5,
              },
              label: {
                show: true,
                position: [liveLabelOffsetHor, "100%"],
                offset: [0, -210],
                fontSize: 20,
                color: "white",
                backgroundColor: "#f50057",
                distance: "top",
                formatter: function (params) {
                  return "Live";
                },
              },
              tooltip: {
                show: true,
                formatter: `${pct}% vs max <br> max of the week`,
              },
            },
          ],
        },
      ],
    };
    setOptions((prevOptions) => ({
      ...prevOptions,
      ...newOptions,
    }));
    setLoading(false);
    setShowData(true);
    //bottom of page
    window.scrollTo(0, document.body.scrollHeight);
  };

  return (
    <>
      <HeroSection getFootTrafficData={getFootTrafficData} />
      <div className="py-14 px-4 md:p-14 container">
        {!loading && !error && showData && (
          <>
            <ReactECharts
              option={options}
              style={{ height: "400px", maxWidth: "900px" }}
            />
            <div className="flex flex-col sm:flex-row gap-10 mt-10">
              <div className="bg-white shadow-md py-3 px-4 rounded-md sm:w-fit">
                <h1 className="text-2xl font-bold text-secondary my-3">
                  Busy Hours
                </h1>
                <p>{busyHours}</p>
              </div>
              <div className="bg-white shadow-md py-3 px-4 rounded-md sm:w-fit">
                <h1 className="text-2xl font-bold text-secondary my-3">Live</h1>
                <div style={{ width: 200, height: 200 }} className="mx-auto">
                  <CircularProgressbar
                    value={Math.abs(liveDelta)}
                    text={`${liveDelta}%`}
                  />
                </div>
                <p className="text-md font-bold my-3">
                  {liveDelta}% {liveDelta > 0 ? "more" : "less"} busy than usual
                </p>
              </div>
            </div>
          </>
        )}
        {
          // if loading is true, display loading message
          loading && <p className="text-center">Loading...</p>
        }
        {
          // if error is true, display error message
          !loading && error && (
            <p className="text-center text-red-500">
              Error fetching data. Please try again later.
            </p>
          )
        }
      </div>
      <div ref={graphDivRef}></div>
    </>
  );
}

export default Home;
