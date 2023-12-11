export function convertSnaps<T>(results: any): T[] {
  return <T[]> results.docs.map((snap: any) => (
    {
      id: snap.id,
      ...<any>snap.data()
    }
  ));
}
