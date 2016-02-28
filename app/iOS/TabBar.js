"use strict";
// Imports
import React, { 
  StyleSheet,
  TabBarIOS,
  NavigatorIOS,
  Component
} from "react-native";

import Feed from "../Shared/Feed/Feed.container";
import Me from "../Shared/Me/Me.container";
import Settings from "../Shared/Settings/Settings.container";

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

const feedIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEABAMAAACuXLVVAAAAKlBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///8KreiaAAAADHRSTlMAIiMkrK2ur+vx8vPnr4I/AAAAAWJLR0QN9rRh9QAAAOBJREFUeNrt2bENglAQgGGiCzCCJSO4ijswgSUzOIMVI1jSkDiUjRGej+suaPF95fFC/vZyTQMAAADwdrw+V+6n7XmW5f8f5/LFEMyzDFVAXz6YgnmWqQp4lA/mYJ5lrgK+X0TzLAIECBAgQIAAAQIECPi/gDFYHMa9FpOfr2ZdsDx2ey2nh8v6+63dnmdZ/g8A4F7gXmAzEiBAgAABAgQIECBAgHuBewEAgHuBe4HNSIAAAQIECBAgQIAAAe4F7gUAAO4F7gU2IwECBAgQIECAAAECBLgXuBcAAAAAAAC8ACyLOujuAh7JAAAAAElFTkSuQmCC";
const meIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAMAAABrrFhUAAACiFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///9/aCTXAAAA1nRSTlMAAQIDBAUGCAkKCwwNDg8QERITFBUWGBobHh8iIyQlJicoKSorLC4vMDEyMzQ1Njk6Oz0+P0BBQkNERUZHSElKTE1OT1BRU1RVVldYWVtdXl9hZGVmZ2hpamtsbW5vcHFyc3R1d3x9fn+AgoOEhoeIiYqMjY6PkJGSk5SVmJmam5ydnp+goaKjpaanqKmqra+wsbKztLW2t7i5urvBwsPExsfIysvMzc7P0NHS09XW19jZ2tvc3d7f4OHi4+Tl5ufo6uvs7e7v8PHy8/T19vf4+fr7/P3+fHdCWAAAAAFiS0dE15CyWj8AAAa1SURBVBgZ7cH/XxR2HQfw18FC4LBkfmnhOpY4a66py5YEs9S1dED7lg2yrrIUh8Mvc26YrmmWpJjbYKlzlLQcDRw4bU4OQUzgdHB8kW+vv6ff9uiIL3fH53183tfn+YTjOI7jOI7jOI7jOI7jOI7jOI7jOI7jOI6MrPyS/TX1V64Hh4eD16/UV79SnJ+F/xeLN1cGOIGbp/wPJyHR5ZRd5RTaKpYjgXn9jZxWo9+LxDR3Wxcj8tmeTCSejL29jFjPngwkmPWtjErHM0gkvnOM2jkfEsbTIcag/8dIDHMqGKPKdCSAB5oYs4+yod4jtzgD3aug3JoezkhoLVR7cpAzdLcQihWOcsZGC6FW7iANGPoelFrRSyP6VkGlB7poSGc2FJrTSGOa0qDPURp0BOoU0ahnoYwvRKNCPuhymoa9B1UKaNwmKJLRTuM6vgg99lLAbqiR2UMBoXuhRRlF7IAS6Z0U0e2FDn4K8UOHRgppgAo5FLMUGuymmHIo4AlQzDUP7PcgBS2B/Uoo6AXYr4qCTsB+NyioA9bLoqgs2C6fovJgu59SVDFst5+i9sF2NRT1FmxXT1EXYLvLFHUJtmunqFbY7jZFdcN2QxR1F7Yboqi7sN1tiuqG7dopqhW2u0xRl2C7eoq6ANvVUNRbsN1+itoH25VQVDFsl09RebBdFkVlwXo3KKgD9quioOOwXwkF/QT2e5CClsB+nhaKueaBArsophwaLKGYpVChkUI+hA5+CvFDh/ROiuj2QokXKaIUWmT2UEDPPKixhwJ2QY+MdhrX5oUiT9G4jVDlNA17D7r4QjQq5IMyRTTqWajzexp0GPrMaaAxTWlQKLuThnT6oNIjvTSibyWUWjNIA4bWQq3CUc7YaCEUe3KAM3S3EKqt6eGMhNZCuW/e4gx0r4R62R8xZhd9SABzKhijyjQkhqdDjEH/89Bl7uNbD525FAgO3jlyP8L5zjFq7/oQ7v4jdwaDgUtnDm7NnwvbJK2uuDjCzw3sTEW4Te2MSttGhEvdOcDPjTS+9q0k2MP3ajvHadmAcBm7exixnl1ehNvQwnHaX/XBDt+uHuUETi1CuMwdXYxI1455CLfoFCcwWr0as2/pWU4i+JwH4bz+Bk6rwe9FOM9zQU7iTA5mV/pvhzm52sUYL6e8hVO4Vp6D8RbXcnLDB9Iwi1Zc4ZT6tyXjfyx+5ncBTuDmKf/DHoyXtLmXU7r2KGbNz4c5nQvLMJGsvOJ9b3/wcSA4NBQMfPzB2/uK87IwkWUXOJ3hLZgdyRWMwNBLqYhZ6ktDjMBryZgFyX9mZAJPITaeglZG5mQy4i6pkhE7n4sY5NUxYseSEG+HGI3313kQlaR17zMaBxFnWxilq9sWIGJf2tzMKBUjrnKHGbXBE+u+gAikrK8aZNSGvoM4WniTMel6PTcFU0rJfb2bMelYgLjxvMOY9VYX+zCJ7JKaEGNWjbjZzJkJ1u7euHw+/sv85Rv31AY5M88jThYGaUKoua72zaqqN2vrmvtoQvdCxMcxWuoPiItVY7TU2ErEQx2tdR5x8AQttg7iPBdpsUYPpK2n1b4PaXW02t8g7FFabiVkHaflKiFq/gAtN7gAkn5N6/0KkhpovXoI+hoVWAI5pVSgFHL+QQX+DjGZI1Rg5F5IKaIKBZDyR6pwFEI8HVShwwMZD1GJZZDxCyrxM8g4TiUqIeMTKnEZIjLHqMTYPEh4nGrkQ0Ip1dgOCTVUoxoSAlQjAAFpo1RjLA3mPURFvgHziqhIAcwroyIvwryTVOQEzGukIv+EeT1U5A6M81KVdJiWTVW+CtMeoyqrYVoRVSmEaVupyi9h2stU5WWYdpiqvAHTTlKVKph2mqr8Baadpyp/hWmNVOVDmPYpVfkEpnVQlXaYdouq/Bum3aYqXTCtl6p8BtMGqEofTBumKkMwbYyqjMK0AarSD9O6qUonTGujKq0wrYmqXIRpp6lKDUw7RFUOwLTfUJWtMO27VOUxmJYxQkVGvDCuiYo0wLxXqMhemLeKiqyAeZ7rVKPNAwHlVGMnJCwcoBKDiyDiKJU4DBlf6aMK/VkQUkYVtkNK6lUq8K9UiPn6AK03uByCttB6L0DUQVruAGR5jtBqf0qCsHuO0WLH7oE8/ygtNVbmQTxsCtJK3T9EnCx6hxY6dx/ixlP0KS1ztcCDeErxB2iRli0piLfkDWeHaYXhM+uTMCsyf3Syg7PsRlXRPMym+35Qevjd5tbgAOOqP9jafPaN7U98GY7jOI7jOI7jOI7jOI7jOI7jOI7jOI7jONP4D3DmQvDDjBr5AAAAAElFTkSuQmCC";
const settingsIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAMAAABrrFhUAAAC6FBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///9CL5jzAAAA9nRSTlMAAQIDBAUGBwgJCgsMDQ4PEBESExQVFhcYGRobHB0eHyAhIiMkJSYnKCkqKywtLi8wMTIzNDU2Nzg5Ojs8PT4/QEFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaW1xdXl9gYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXp7fH5/gIGDhIWGh4iJiouMjY6PkJGUlpeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrq+wsbKztLW2t7q7vL2/wcLDxMXGx8jJysvMzc7P0NHS09TV1tfY2drb3N3e3+Dh4uPk5ebn6Onq6+zt7u/w8fLz9PX29/j5+vv8/f4B6sgVAAAAAWJLR0T3q9x69wAAEAdJREFUGBntwXt8lNWBBuB3MplMbiCBJAgCViCU+7VgjbKWy+4qSHVBJKAGoQSlIIFCsS0tKBVB6i510Si4oG2JSEoJ7IKXdr2AOGAMwQRQMIFkCUFCMDCTmffvFQgkk+9835lzJsP8Mr95HkRFRUVFRUVFRUVFRUVFRUVFRbUFP9qzNw0Wurv2jETk6pPvI0u7wFT6EdK3rR8iU8p6N684kAwTKQd5RcOGNESe2J9Xs9GuWAg5P2Cjc4sdiDBjDrFJHkRsm9mkdCoiSa8C+vk1BFbSz+6+iBTt11yiP+8kGEzz0Z/7pQ6IBDHZp2lQ2x8tDKqjwdlcO9q8TBdFDreDn5QyihzMRFt3lmLbbWgmZhfFqtHWldDEcjSznCZK0Nbl00TDvbjhHg9N5KOtm0Mz5alolPI1zfwMbV0nD83ssuEqWwHNeNLQ5u2hKVfxqfr6U8UumtqDti+HQchB25dcS20X2iMC5FHbq4gEo6htJCLCZ9R0CJHhKWp6CpEhsZpaapIQIV6gltWIFLe5qcHTHRFjKzX8BZEjkxruQgTZT2X7EUG61FDZt7chcmynhp2IGFnUMg03hXPVV14KNZQsjEUrcJ6kyPkts0akxsamjpj95nmKnHTiZthMC3loBQsocGxOAm5IyDlOgQW4Cfr7aGUggpZQQQPPs/HwE/+chwYV8Qi939LSQgQj4YfjnlhRSIPK0TC4t4oGhSueGNcnHiG1i5b+CC0Jwx99fvuBKop9nQGBPicoVvXpO8/PGJaAkLBV09IeKBv+i+1HvbRQlQGhQbW04D26ffEwtLretHYCirLKKOEZDRMPNFCi9BG0sodozZsINR7KPAtTqyjjRitbTokhUEOZY/EwlfAVZdDK3qLEVKihzBxYeJIyaGUHKbEcaihxPgEWEmspgVZ2nhKboYYSW2DpT5RA60qhzMdQQ4lZsDSHEmhdQylTAzWUGA5LIykBZQ+/53o1AyYepFQ6THTPO/jB0ji0QIlOsJRGCSjqtpPfuzwPYgspdQ/EptXyewfS4Y8ScbAURwmouaeK17yZCJGXKDUbIs71vOZIN/ihhAOW4igBJfPcvM7VEwLbKLUGAr0O8Lrjd6A5SnSEpVRKQIHt39lMzQQY7adUAYymfMsm5f3QDCWGw9IISiBw9tfpx7syBi39H6WK0VLcevqpGoomlMiGpZmUQMDi8tnSrhT4S/RR6pId/n6wjy2cuws3UOJ1WNpECQTKuYtGx4bCTz8GoBf8PFhDgwtjcR0lzjhgIa6aEghQ3E6KfJeNJrETChmAwp/G4QbHH3wUqJ+ARpTJgoXplEFgHAU08XIcrhn6UiUDVP2fd+OaHh9SrP6fcQ1lPrfDlL2IMghIbD5NfdQNgP2RT6lk/8MxACZW08zFf8JVbso8DVMLKeNGIOxv0ULVGGdOGZWVzk16wUdztT/GFVOPUOLiAJgYeJESRx5GAGLeoCVPJbVcoqVzw3HVoNxtZQ20UNYZQp2P0kJD6du5AxEIWx7D48wgXOccmrVq2/5Kirk6Q6DzQYqd3rdtVdZQJwK1luFS2Qv+4jPGzlxRSIOyATAYeJQGhStmjs2Ih5qnGT5HOsIovpwGFxfY4ce+8CINyuOh7iEvw+g9B4zmU+DzLAduiJteRIH5UNevlmG1DkbOExSp3pg9PM3hSBuRveksRU44oSzxCMPLdz+MJlPLZKhbyXA76oTRNmrYBg0fMuymwujWGiqruRUaDjDsFkBgP5Xth451DLeGvjDKpIZMaOhynmG2AQL51JAPHf/awLA6lAijHh5qaLgDOn7DcKrpBYG11LIGOmx/Zvj4HoJA4llqOZcMHUkuhs1zEJlHTfOg5fYqhsleO0Q+o6ZD0HPPZYbFyVSI3Elto6BnPsPh8igIvUZtr0HTRobBIgi1v0BtF9pDT2IRb7oCG4RyGIQcaOpXx5vseArE9tKUq/hUff2pYhdN7YWubCoq3bhs8uAeKbGxKT0GT162qYxqLo+CWJqHZnbacJVtJ8140qBrIwPnLnysC1romr3Lw8AtgokcmilPRaPUCprJga7ELxig8iVpEEpfWsEAFdhgIp8mvGNww1gvTeRDW/86BuJkjhOmnHO/YSAqU2CmhCZ+h2ZW0kQJtLWroZx7bRIsJa9zU87dDWbOUmxnDJqJKaRYNbQtpVzxIEgNPky5NTCT6aJIaQf46VBGEddd0OWsoNTmJAQgIY9S59vDTEz2aRrUDUQLfWtpUJ1rh7YcynhzEaBFXsrkwlz7tZfYQhYMstjCpbXtoc9eSgn3DARshpsSx+2w0LuAflZDYDX9FPRGMP6FEu6JUDDRTYmHYGnsITbZaoNAzFY2OTQWwXmL1nwzoWS6l9b+Cmsx2ZVs9EkihOL/wUbVuXYEp91FWsuFolxac6dD4pZ1l3lFaSpMpJbxisvrbkGwZtHaf0HZZlpbBKmMHSQrM2CqTyXJHRkIUqfM2YdoqTgJypKKacmFAIwvOtwLFjJKisZDX2zGpKV5fz9DGfcgaBjkpqXqDzf+avIAJyzZY2Ep1g4tt4yYujL/04sMzBpoeZGBOLXnlWcm9YzBTZPw+Ib3KqniZDK0JJ9kwC4c+POz00c4EHqJH1BVDjTNpaLKxxByK6mq3AlNznIq8j2AUDtOVUugbQlVfYxQ81GROw3a0txUVI9Qo6pCBGE3VSHUqOoxBOFxqkKoUVVXBKELVSHUqKgUQSmjIoQaFW1EUDZSEUKNin6JoDxDRQg1Kvo3BGUKFSHUqGgwgjKEihBqVNQNQelORQg1KuqAoHSkIoQaFTkQlDgqQqhRkQNBiaMihBoVdUBQOlIRQo2KuiEoPagIoUZFQxCUoVSEUKOiyQjKFCpCqFHRMgTlGSpCqFHRJgRlExUh1KioFEE5SkUINarqiiB0oSqEGlVlIwjZVIVQo6pdCMJ/UxVCrZ6KPOnQlu6hIh9CbR9VLYW2pVR1FKH2gI+KKpzQ5KygqhUIuawSKpoLTU9S1fuJuAlSR+es233My0B9kwwt7cqpovK9DY/F4+aJ6znpmc2f1jEAL0LLOgbGfWzP+rnjOyMsYnrev+TVD87QknswNAz2UObM3/OWTsqIRfi5aOlwEpQlH6alQ7MzO0HmR3v2psFCd9eekWgNi2htM5RtobVZkOqT7yNLu8BU+hHSt60fgpfuprVFULSY1uraQSJlvZtXHEiGiZSDvKJhQxqCtoPWvDOg5FEvrW2GtdifV7PRrlgIOT9go3OLHQjSZEq4J0LBRDclxsPSuM/Z5BWI2N5kkyMTEJzYryjhnoGAPeqmREkMLPQqoJ9fQ2Al/ezui6DMo4w3FwFa7KPMbJhrv+YS/XknwWCaj/7cL3VAEJwVlNqShAAk5FGqPA5mYrJP06C2P1oYVEeDs7l26Psl5YoHQWrwYcotgZlMF0UOt4OflDKKHMyEtnY1lHO/mAxLyevclKtpBzNnKbbdhmZidlGsGtqcXzAQ38x1wpTzyXIGoq4/zJTQxHI0s5wmSqDtZQaofEkahNKXVjBAXyTCRD5NNNyLG+7x0EQ+dD3GwHl2Pd4VLXSdudvDwG2CiTk0U56KRh1P0swcaBpYRzWlG5dNHnJ7isORcvuQKcs2lVFRNsRSPTTzNxuusu2gGU8q9LQ7wpusrh/E9tCUq/hUff2pYhdN7YEeWz5vuqJECOUwCDnQs4hhsAlC7S5Q24V20HK3m+GwAEJ51JYHLenlDAvPGIiMoraR0GH/H4bJ2Z4Q+YyaDkHLaobNwSQIPEVNT0HHJB/D5x0bjBKrqaUmCRp6n2M4/QYCL1DLamiIP8Cw8k6C0W1uavB0h4YNDLPzXWG0lRq2QkP/Bobbf8AokxoyoeFpht1nENhPZfuh42GG3f/CqGsNldV0gQZnGcNtGYz+Sg0F0HGfj+H1vgMGWdQyDTrWMqy+7AQD50mKnN8ya0RqbGzqiNlvnqfISSc0ON5lGJ3pDaMFFDg2JwE3JOQcp8AC6EgpYdjU3w2jhAoaeJ6Nh5/45zw0qIiHjp6nGSa+LPhL+OG4J1YU0qByNAzuraJB4YonxvWJh6oBZxgWvvm4LmH4o89vP1BFsa8zINDnBMWqPn3n+RnDEhC4YTW0dIlaTntoaSmuGv6L7Ue9tFCVAaFBtbTgPbp98TAE6M7zNOd7ISnnSyoreiJuTBUt/BZXZJVRwjMaJh5ooETpIwjM6DqaqZ4IIGbKJ1The/d+G4BuH9HU73GVhzLPwtQqyrgRoHH1FPuwB67JfLmaASpe3hPXxL1MEy/hGsoci4ephK8og0Dd9x0FfH9w4AbHpEIG4LUhaCb7O4q8bMM1lJkDC09SBgH7yQUa1DwIP70YgAz4GXqMRnkxaESJ8wmwkFhLCQTuxzVsYd8P4M9+iVJeJ/yl7GJL6224jhJbYOlPlICCoVX0sz4OLRVT6hRailnppZ/fowklZsHSHEpARd9yNvl2CowKKPURjCbUsInvV2iGEiNgaSQloOSOY7zuQC8IrKHUXyDQ08XrvstCc5ToBEtplICaW4t4zeYEiPyMUi9AJP41XnNmNPxQwgFLcZSAovQD/F7tNIjdQ6l5EJt3md97uzP8USIOluIoAVVxS94/uLEHTKRTagJMZLzievenaIkSHWEplRJoZTWUGQAllBgGSyMogVb2MWWSoYQS2bA0kxJoZZspUQ01lHgdljZRAq1sOSX2QQ0lzjhgIa6aEmhlUynxBtRQJgsWplMGrWwIJX4JNZT53A5T9iLKoJUlemltItS4KfM0TC2kjBut7QSt3Q41U49Q4uIAmBh4kRJHHkZr20NLVVA2KHdbWQMtlHWGUOejtNBQ+nbuQLS+P9LS36DFOTRr1bb9lRRzdYZA54MUO71v26qsoU6ExkJaWo5gxGeMnbmikAZlA2Aw8CgNClfMHJsRj5AaRCu+/ghafDkNLi6ww4994UUalMfjJsijhTfQCuZT4PMsB26Im15Egfm4GWJzjzRQyPvVc060AucJilRvzB6e5nCkjcjedJYiJ5yIEJOoZTIixjZqeBuR49YaKvv2NkSQ/VS2HxHkbmrIROTIp4atiBg9PNTQcAcixVpqWYMIkXiWWs4lIzLMo6Z5iAyfUdMhRIQ7qW0UIsFr1JaHCNCultrq2qPty2EQctD27aUpV/Gp+vpTxS6a2os2L9VDM7ttuMq2g2Ya0tHWzaWZ8lQ0Sq2gmRy0dfk04R2DG8Z6aSIfbV0JTfwOzaykiRK0dWcptjMGzcQUUqwabV2miyKlHeCnQxlFXHehzYvJPk2DuoFooW8tDapz7YgESSvr2cI0GEz20Z97/S2IFL0L6Gc1BFbTT0FvRJIxB9kkPwYCtjfZ5PB9iDAx2ZVs9EkihOL/wUbVuXZEnuSVl3jFsXSY6PQlr3CvvwWRKWMHycoMmOpTSXJHBiLX+KLDvWAho6RoPCKaPRaWYu2IioqKioqKioqKioqKioqKihL6fyrFOTovozEjAAAAAElFTkSuQmCC";
const writeIcon = "data:image/png;base64,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";

// Classes
export default class TabBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: "FeedTab"
    };
  }

  renderFeed() {
    return (
      <NavigatorIOS
        style={styles.container}
        tintColor= "white"
        barTintColor= "#6d8ed4"
        titleTextColor= "white"
        translucent={false}
        navigationBarHidden={false}
        initialRoute={{
          title: "Feed",
          component: Feed,
          rightButtonIcon: {uri: writeIcon, scale: 10}
        }}/>
    );
  }

  renderMe() {
    return (
      <NavigatorIOS
        style={styles.container}
        tintColor= "white"
        barTintColor= "#6d8ed4"
        titleTextColor= "white"
        translucent={false}
        navigationBarHidden={false}
        initialRoute={{
          title: "Me",
          component: Me
        }}/>
    );    
  }

  renderSettings() {
    return (
      <NavigatorIOS
        style={styles.container}
        tintColor= "white"
        barTintColor= "#6d8ed4"
        titleTextColor= "white"
        translucent={false}
        navigationBarHidden={false}
        initialRoute={{
          title: "Settings",
          component: Settings
        }}/>
    );    
  }

  render() {
   return (
      <TabBarIOS
        tintColor="#6d8ed4"
        barTintColor="#f5f6f9"
        translucent={false}
        >

        <TabBarIOS.Item
          title =''
          icon = {{uri: feedIcon, scale: 8}}
          selected={this.state.selectedTab === "FeedTab"}
          onPress={() => {
            this.setState({
              selectedTab: "FeedTab"
            });
          }}
          >
          {this.renderFeed()}
        </TabBarIOS.Item>

        <TabBarIOS.Item
          title =''
          icon = {{uri: meIcon, scale: 8}}
          selected={this.state.selectedTab === "Me"}
          onPress={() => {
            this.setState({
              selectedTab: "Me"
            });
          }}
          >
          {this.renderMe()}
        </TabBarIOS.Item>

        <TabBarIOS.Item
          title =''
          icon = {{uri: settingsIcon, scale: 8}}
          selected={this.state.selectedTab === "Settings"}
          onPress={() => {
            this.setState({
              selectedTab: "Settings"
            });
          }}
          >
          {this.renderSettings()}
        </TabBarIOS.Item>

      </TabBarIOS>
    );
  }
} 
