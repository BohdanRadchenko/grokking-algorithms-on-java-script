/**
 * A greedy algorithm is simple: at each step, pick the optimal move.
 * In technical terms: at each step you pick the locally optimal
 * solution, and in the end you’re left with the globally optimal solution.
 * Obviously, greedy algorithms don’t always work. But they’re simple to
 * write!
 * Sometimes all you need is an algorithm that solves the problem pretty
 * well. And that’s where greedy algorithms shine, because they’re simple
 * to write and usually get pretty close.
 *
 * This is called an approximation algorithm. When calculating the exact
 * solution will take too much time, an approximation algorithm will
 * work. Approximation algorithms are judged by
 * • How fast they are
 * • How close they are to the optimal solution
 * Greedy algorithms are a good choice because not only are they simple
 * to come up with, but that simplicity means they usually run fast, too.
 * In this case, the greedy algorithm runs in O(n^2) time, where n is the
 * number of radio stations.
 * */

const stations = {}
const states = ['mt', 'wa', 'or', 'id', 'nv', 'ut', 'ca', 'az']

stations['kone'] = new Set(['id', 'nv', 'ut'])
stations['ktwo'] = new Set(['wa', 'id', 'mt'])
stations['kthree'] = new Set(['or', 'nv', 'ca'])
stations['kfour'] = new Set(['nv', 'ut'])
stations['kfive'] = new Set(['ca'])

const choseBestCoverage = (stations, states) => {
    let statesNeeded = new Set(states)
    const finalStations = new Set()

    while (statesNeeded.size) {
        let bestStation = null
        let statesCovered = new Set()

        for (let station in stations) {
            const covered = new Set([...statesNeeded].filter(state => stations[station].has(state)))

            if (covered.size > statesCovered.size) {
                bestStation = station
                statesCovered = covered
            }
        }

        if (!bestStation) return {finalStations}

        statesNeeded = new Set([...statesNeeded].filter(state => !statesCovered.has(state)))
        finalStations.add(bestStation)
    }

    return {finalStations}
}

console.log(choseBestCoverage(stations, states));