export default function RadialChart() {
  const myData = [{ angle: 1 }, { angle: 5 }, { angle: 2 }]
  return (
    <div>
      <RadialChart data={myData} width={300} height={300} />
    </div>
  )
}
